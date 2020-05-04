import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { render } from 'ejs'
// Local Modules
import { constantizeElementName } from './helpers'

// Required paths
const templatesPath = join(dirname(__filename), '../templates')
const currentPath = process.cwd()
const sourcePath = join(currentPath, 'src')
const containersPath = join(currentPath, 'src/containers')
const componentsPath = join(currentPath, 'src/components')
const defaultFormat = 'js'

export function generateContainerComponent (elementName, { wrapped }) {
  const format = defaultFormat
  const jsTemplatesPath = join(templatesPath, format)
  const constantizedName = constantizeElementName(elementName)
  const containerTemplateString = readFileSync(join(jsTemplatesPath, `container.${format}`)).toString()
  const componentTemplateString = readFileSync(join(jsTemplatesPath, `component.${format}`)).toString()
  const componentPath = buildComponentPath(constantizedName, { wrapped, type: 'component' }) || constantizedName
  const containerPath = buildComponentPath(constantizedName, { wrapped, type: 'container' }) || constantizedName
  const requiredPaths = [sourcePath, containersPath, componentsPath, componentPath, containerPath]
  if (createRequiredPaths(requiredPaths)) {
    const componentRelativePath = `${wrapped ? `../../components/${constantizedName}/` : '../components/'}${constantizedName}`
    const parsedContainerTemplate = render(containerTemplateString, { elementName: constantizedName, componentPath: componentRelativePath })
    const parsedComponentTemplate = render(componentTemplateString, { elementName: constantizedName })
    writeFileSync(
      join(`${containersPath}/${wrapped ? `${constantizedName}/` : ''}${constantizedName}Container.${format}`),
      parsedContainerTemplate
    )
    writeFileSync(
      join(`${componentsPath}/${wrapped ? `${constantizedName}/` : ''}${constantizedName}Component.${format}`),
      parsedComponentTemplate
    )  
  }
}

function buildComponentPath(constantizedName, { wrapped, type }) {
  if (!wrapped) return false

  const selectedPath = type === 'component' ? componentsPath : containersPath 
  return join(selectedPath, constantizedName)
}

function createRequiredPaths(lookedPaths) {
  try {
    for (const lookedPath of lookedPaths) {
      if (existsSync(lookedPath)) continue
      if (!lookedPath) continue

      mkdirSync(lookedPath, '777')
    }
    return true
  } catch {
    return false
  }
}
