import { glob, readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

// Get icon file names to know which generated components to transform
const iconDir = "src/raw/icon"
const iconFiles = await readdir(iconDir)
const iconComponentNames = iconFiles
  .filter((f) => f.endsWith(".svg"))
  .map((f) => {
    // e.g. cancel_m_icon.svg -> CancelMIcon
    const name = f
      .replace(".svg", "")
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")
    return name
  })

const dir = "src/generated"
const files = await readdir(dir)

for (const file of files.filter((f) => f.endsWith(".tsx"))) {
  const componentName = file.replace(".tsx", "")
  if (!iconComponentNames.includes(componentName)) continue

  const filePath = join(dir, file)
  let content = await readFile(filePath, "utf8")

  content = content.replace(
    /fill="(?!none|currentColor|url\()[^"]*"/g,
    'fill="currentColor"',
  )
  content = content.replace(
    /stroke="(?!none|currentColor|url\()[^"]*"/g,
    'stroke="currentColor"',
  )

  await writeFile(filePath, content)
}
