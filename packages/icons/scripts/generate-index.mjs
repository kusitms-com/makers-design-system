import { readdir, writeFile } from "node:fs/promises"

const dir = "src/generated"
const files = await readdir(dir)

const components = files
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(".tsx", ""))
  .sort()

const lines = components.map(
  (name) => `export { default as ${name} } from "./${name}"`,
)

await writeFile(`${dir}/index.ts`, `${lines.join("\n")}\n`)
