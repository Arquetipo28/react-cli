import arg from 'arg';
import fs from 'fs'
import * as ejs from 'ejs';
// Local Modules
import { generateContainerComponent } from './lib/generators'

function parseArgumentToOptions(rawArgs) {
  const args = arg(
    {
      '--yes': Boolean,
      '--wrapped': Boolean,
      '--name': String,
      '-y': '--yes',
      '-n': '--name',
      '-w': '--wrapped'
    },
    {
      argv: rawArgs.slice(2)
    }
  );

  return {
    elementName: args['--name'],
    wrapped: args['--wrapped'],
    elementAction: args._[0],
    elementType: args._[1]
  };
}



function executeAction(action, { elementType, elementName, wrapped }) {
  switch (action) {
    case 'g': {
      if (elementType === 'component' || elementType === 'c') {
        generateContainerComponent(elementName, { wrapped })
      }
    }
    default: {
      return false
    }
  };
}

export function cli(args) {
  const options = parseArgumentToOptions(args);
  const { elementAction, elementType, elementName, wrapped } = options

  executeAction(elementAction, { elementType, elementName, wrapped });
  console.log(options);
}
