import arg from 'arg';
import fs from 'fs'
import * as ejs from 'ejs';
// Local Modules
import { generateContainerComponent } from './lib/generators'

function parseArgumentToOptions(rawArgs) {
  const args = arg(
    {
      '--yes': Boolean,
      '-y': '--yes',
      '--name': String,
      '-n': '--name'
    },
    {
      argv: rawArgs.slice(2)
    }
  );

  return {
    elementName: args['--name'],
    elementAction: args._[0],
    elementType: args._[1]
  };
}



function executeAction(action, { elementType, elementName }) {
  switch (action) {
    case 'g': {
      if (elementType === 'component' || elementType === 'c') {
        generateContainerComponent(elementName)
      }
    }
    default: {
      return false
    }
  };
}

export function cli(args) {
  const options = parseArgumentToOptions(args);
  const { elementAction, elementType, elementName } = options

  executeAction(elementAction, { elementType, elementName });
  console.log(options);
}
