import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(__dirname, "../src")

const raw = JSON.parse(fs.readFileSync(`${srcDir}/raw-tokens.json`, "utf-8"))

// CSS 변수명 생성
function toCssVarName(parts) {
  return (
    "--" +
    parts
      .join("-")
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

// Atomic 토큰 수집 (참조 resolve에 사용)
const atomicKey = Object.keys(raw).find((k) => k.startsWith("Atomic"))
const atomicFlat = atomicKey ? flattenSet(raw[atomicKey]) : {}

// {green.60} 같은 참조를 실제 값으로 resolve
function resolveRef(value) {
  if (typeof value !== "string") return value
  const match = value.match(/^\{(.+)\}$/)
  if (!match) return value
  const resolved = atomicFlat[match[1]]?.value
  if (resolved == null) console.warn(`미해결 참조: ${value}`)
  return resolved ?? value
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

// raw 전체를 한 번만 순회해서 cssVars 수집
const cssVars = {}
for (const [setName, setTokens] of Object.entries(raw)) {
  if (!setTokens || typeof setTokens !== "object") continue
  if (setName === "global") continue
  for (const [key, { value, type }] of Object.entries(flattenSet(setTokens))) {
    const cssName = toCssVarName(key.split("."))
    cssVars[cssName] = { value: resolveRef(value), type }
  }
}

// 1. src/tokens.json
function buildNested(cssVars) {
  const result = {}
  for (const [cssName, { value }] of Object.entries(cssVars)) {
    // "--brand-primary" → ["brand", "primary"]
    const parts = cssName.slice(2).split("-")
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
  .map(
    ([k, { type }]) => `  ${k.replace("--", tailwindPrefix[type])}: var(${k});`,
  )

fs.writeFileSync(
  `${srcDir}/themes.css`,
  ["@theme inline {", ...themeLines, "}", ""].join("\n"),
)
console.log("src/themes.css 생성 완료")
