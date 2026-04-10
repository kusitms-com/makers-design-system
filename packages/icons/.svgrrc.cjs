const path = require("path")

const indexTemplate = (filePaths) => {
  const entries = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath))
    return `export { default as ${basename} } from "./${basename}"`
  })
  return entries.join("\n") + "\n"
}

module.exports = {
  jsxRuntime: "automatic",
  typescript: true,
  icon: true,
  expandProps: "end",
  svgProps: {
    "aria-hidden": "true",
  },
  replaceAttrValues: {
    "#000": "currentColor",
    "#000000": "currentColor",
    black: "currentColor",
  },
  indexTemplate,
}
