function isSplited(string) {
  if (hasSpaces(string)) {
    return ' '
  } else if (hasDashes(string)) {
    return '-'
  } else if (hasUnderscores(string)) {
    return '_'
  } else {
    return false
  }
}

function isString(value) {
  return typeof value === 'string'
}

function hasSpaces(string) {
  return string.indexOf(' ') !== -1
}

function hasDashes(string) {
  return string.indexOf('-') !== -1
}

function hasUnderscores(string) {
  return string.indexOf('_') !== -1
}

function capitalizeString(string) {
  return `${string.charAt(0).toUpperCase()}${string.substr(1)}`
}

export function constantizeElementName(elementName) {
  if (!isString(elementName)) return false

  const splitSymbol = isSplited(elementName)
  if (splitSymbol) {
    const elementNameArray = elementName.split(splitSymbol)
    const capitalizedNameArray = elementNameArray.map(element => {
      return capitalizeString(element)
    })
    const constantizedName = capitalizedNameArray.join('')
    return constantizedName 
  } else {
    return capitalizeString(elementName)
  }
}
