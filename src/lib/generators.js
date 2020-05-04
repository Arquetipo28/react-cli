import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { render } from 'ejs'
// Local Modules
import { constantizeElementName, createRequiredPaths, buildComponentPath } from './helpers'

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
  const componentPath = buildComponentPath(constantizedName, { wrapped, elementPath: componentsPath }) || constantizedName
  const containerPath = buildComponentPath(constantizedName, { wrapped, elementPath: containersPath }) || constantizedName
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

