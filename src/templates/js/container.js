import React from 'react'
import <%= elementName %>Component from '<%= componentPath %>Component'

export const <%= elementName %>Container = () => {
  const props = {}
  return (
    <<%= elementName %>Component {...props}></<%= elementName %>Component>
  )
}
