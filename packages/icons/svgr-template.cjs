function template(variables, { tpl }) {
  const name = variables.componentName.name.replace(/^Svg/, "")
  return tpl`
${variables.imports}

const ${name} = (${variables.props}) => (
  ${variables.jsx}
)

export default ${name}
`
}

module.exports = template
