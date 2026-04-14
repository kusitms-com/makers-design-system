import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

const dir = "src/generated"
const files = await readdir(dir)

for (const file of files.filter((f) => f.endsWith(".tsx"))) {
  const filePath = join(dir, file)
  let content = await readFile(filePath, "utf8")
  content = content.replace(/\bSvg([A-Z]\w+)/g, "$1")
  await writeFile(filePath, content)
}

const indexPath = join(dir, "index.ts")
let indexContent = await readFile(indexPath, "utf8")
indexContent = indexContent.replace(
  /from "(\.[^"]+)(?<!\.js)"/g,
  'from "$1.js"',
)
await writeFile(indexPath, indexContent)
