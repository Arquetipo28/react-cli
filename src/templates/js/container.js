import React from 'react'
import <%= elementName %>Component from '../components/<%= elementName %>Component'

export const <%= elementName %>Container = () => {
  const props = {}
  return (
    <<%= elementName %>Component {...props}></<%= elementName %>Component>
  )
}
