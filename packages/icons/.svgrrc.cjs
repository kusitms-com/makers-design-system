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
  dimensions: true,
  icon: false,
  expandProps: "end",
  svgProps: {
    "aria-hidden": "true",
  },
  replaceAttrValues: {
    "#000": "currentColor",
    "#000000": "currentColor",
    black: "currentColor",
  },
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            cleanupIds: false,
          },
        },
      },
    ],
  },
  indexTemplate,
}
