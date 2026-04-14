import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(__dirname, "../src")

const rawTokensPath = `${srcDir}/raw-tokens.json`
if (!fs.existsSync(rawTokensPath)) {
  console.log("raw-tokens.json 없음 — 변환 건너뜀")
  process.exit(0)
}
const raw = JSON.parse(fs.readFileSync(rawTokensPath, "utf-8"))

// CSS 변수명 생성 (camelCase → kebab-case 단어 경계 유지)
function toCssVarName(parts) {
  return (
    "--" +
    parts
      .join("-")
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[^a-zA-Z0-9_]+/g, "-")
      .toLowerCase()
  )
}

// { "key.sub": { value, type } } 형태로 평탄화
function flattenSet(obj, prefix = [], inheritedType = null) {
  const result = {}
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue
    const parts = [...prefix, key]
    if (val && typeof val === "object" && "$value" in val) {
      result[parts.join(".")] = {
        value: val.$value,
        type: val.$type ?? inheritedType,
      }
    } else if (val && typeof val === "object") {
      Object.assign(result, flattenSet(val, parts, val.$type ?? inheritedType))
    }
  }
  return result
}

// 참조 resolve용으로 전체 토큰을 수집
const allFlat = {}
for (const setTokens of Object.values(raw)) {
  if (setTokens && typeof setTokens === "object") {
    for (const [key, entry] of Object.entries(flattenSet(setTokens))) {
      const isRef =
        typeof entry.value === "string" && entry.value.startsWith("{")
      if (!isRef) allFlat[key] = entry
    }
  }
}

// {green.60} 같은 참조를 재귀적으로 resolve
function resolveRef(value, visited = new Set()) {
  if (typeof value !== "string") return value
  const match = value.match(/^\{(.+)\}$/)
  if (!match) return value
  const key = match[1]
  if (visited.has(key)) {
    console.warn(`순환 참조 감지: ${value}`)
    return value
  }
  const resolved = allFlat[key]?.value
  if (resolved == null) {
    console.warn(`미해결 참조: ${value}`)
    return value
  }
  return resolveRef(resolved, new Set([...visited, key]))
}

// $type → Tailwind @theme 네임스페이스 prefix 매핑
const tailwindPrefix = {
  color: "--color-",
  shadow: "--shadow-",
  borderRadius: "--radius-",
  spacing: "--spacing-",
  fontFamily: "--font-",
  fontSize: "--text-",
  fontWeight: "--font-weight-",
  lineHeight: "--leading-",
  letterSpacing: "--tracking-",
}

// raw 전체를 순회해서 cssVars 수집 (global 제외)
// dotKey: 원래 토큰 경로 (tokens.json 생성에 사용)
const cssVars = {}
for (const [setName, setTokens] of Object.entries(raw)) {
  if (!setTokens || typeof setTokens !== "object") continue
  if (setName === "global") continue
  for (const [key, { value, type }] of Object.entries(flattenSet(setTokens))) {
    const cssName = toCssVarName(key.split("."))
    cssVars[cssName] = { value: resolveRef(value), type, dotKey: key }
  }
}

// 1. src/tokens.json — dotKey 기준으로 중첩 구조 생성 (CSS 변수명 역산 없음)
function buildNested(cssVars) {
  const result = {}
  for (const [, { value, dotKey }] of Object.entries(cssVars)) {
    const parts = dotKey.split(".")
    let cur = result
    for (let i = 0; i < parts.length - 1; i++) {
      cur[parts[i]] ??= {}
      cur = cur[parts[i]]
    }
    cur[parts[parts.length - 1]] = value
  }
  return result
}

fs.writeFileSync(
  `${srcDir}/tokens.json`,
  JSON.stringify(buildNested(cssVars), null, 2) + "\n",
)
console.log("src/tokens.json 생성 완료")

// 2. src/index.css — :root (CSS 변수)
const cssLines = Object.entries(cssVars).map(
  ([k, { value }]) => `  ${k}: ${value};`,
)
fs.writeFileSync(
  `${srcDir}/index.css`,
  [":root {", ...cssLines, "}", ""].join("\n"),
)
console.log("src/index.css 생성 완료")

// 3. src/themes.css — @theme inline (Tailwind 전용)
const themeLines = Object.entries(cssVars)
  .filter(([, { type }]) => type != null && tailwindPrefix[type] != null)
  .map(([k, { type }]) => `  ${tailwindPrefix[type]}${k.slice(2)}: var(${k});`)

fs.writeFileSync(
  `${srcDir}/themes.css`,
  ["@theme inline {", ...themeLines, "}", ""].join("\n"),
)
console.log("src/themes.css 생성 완료")
