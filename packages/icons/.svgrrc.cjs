const path = require("path")

const template = (variables, { tpl }) => {
  const componentName = variables.componentName.replace(/^Svg/, "")
  return tpl`
${variables.imports}
export default function ${componentName}(${variables.props}) {
  return ${variables.jsx}
}
`
}

const indexTemplate = (filePaths) => {
  const entries = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath))
    const pascalName = basename
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("")
    return `export { default as ${pascalName} } from "./${basename}"`
  })
  return entries.join("\n") + "\n"
}

module.exports = {
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
  template,
  indexTemplate,
}
