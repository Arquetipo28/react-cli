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

export function generateContainerComponent (elementName) {
  const format = defaultFormat
  const jsTemplatesPath = join(templatesPath, format)
  const constantizedName = constantizeElementName(elementName)
  const containerTemplateString = readFileSync(join(jsTemplatesPath, `container.${format}`)).toString()
  const componentTemplateString = readFileSync(join(jsTemplatesPath, `component.${format}`)).toString()
  const requiredPaths = [sourcePath, containersPath, componentsPath]
  if (createRequiredPaths(requiredPaths)) {
    const parsedContainerTemplate = render(containerTemplateString, { elementName: constantizedName })
    const parsedComponentTemplate = render(componentTemplateString, { elementName: constantizedName })
    const containerFile = writeFileSync(join(`${containersPath}/${constantizedName}Container.${format}`), parsedContainerTemplate)
    const componentFile = writeFileSync(join(`${componentsPath}/${constantizedName}Component.${format}`), parsedComponentTemplate)  
  }
}

function createRequiredPaths(lookedPaths) {
  try {
    for (const lookedPath of lookedPaths) {
      if (existsSync(lookedPath)) continue

      mkdirSync(lookedPath, '777')
    }
    return true
  } catch {
    return false
  }
}
