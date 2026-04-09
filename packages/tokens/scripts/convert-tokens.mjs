import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(__dirname, "../src")
const stylesPath = path.resolve(__dirname, "../../../apps/docs/src/styles.css")

const raw = JSON.parse(fs.readFileSync(`${srcDir}/raw-tokens.json`, "utf-8"))

// raw-tokens.json → { key: value } (W3C DTCG $value 추출)
function extractValues(obj) {
  if (obj && typeof obj === "object" && "$value" in obj) return obj.$value
  const result = {}
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue
    result[key] = extractValues(val)
  }
  return result
}

// { "color.brand.50": "#eef2ff", ... } 형태로 평탄화
function flatten(obj, prefix = []) {
  const result = {}
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue
    const parts = [...prefix, key]
    if (val && typeof val === "object" && "$value" in val) {
      result[toCssVarName(parts)] = val.$value
    } else if (val && typeof val === "object") {
      Object.assign(result, flatten(val, parts))
    }
  }
  return result
}

// CSS 변수명 규칙:
//   font.family.sans → --font-sans
//   color.brand.50   → --color-brand-50
//   font.size.sm     → --font-size-sm
function toCssVarName(parts) {
  if (parts[0] === "font" && parts[1] === "family") {
    return `--font-${parts.slice(2).join("-")}`
  }
  return `--${parts.join("-")}`
}

// 1. tokens.json 생성
const tokens = extractValues(raw)
fs.writeFileSync(
  `${srcDir}/tokens.json`,
  JSON.stringify(tokens, null, 2) + "\n",
)
console.log("✓ tokens.json 생성 완료")

// 2. themes.css 생성 (:root CSS 변수)
const cssVars = flatten(raw)
const cssLines = Object.entries(cssVars).map(([k, v]) => `  ${k}: ${v};`)
const themesContent = `:root {\n${cssLines.join("\n")}\n}\n`
fs.writeFileSync(`${srcDir}/themes.css`, themesContent)
console.log("✓ themes.css 생성 완료")

// 3. styles.css @theme inline 섹션 업데이트
const themeLines = Object.keys(cssVars).map((k) => `  ${k}: var(${k});`)
const themeBlock = [
  "/* @theme-start */",
  "@theme inline {",
  ...themeLines,
  "}",
  "/* @theme-end */",
].join("\n")

const styles = fs.readFileSync(stylesPath, "utf-8")
const updated = styles.replace(
  /\/\* @theme-start \*\/[\s\S]*?\/\* @theme-end \*\//,
  themeBlock,
)
fs.writeFileSync(stylesPath, updated)
console.log("✓ styles.css @theme inline 업데이트 완료")
