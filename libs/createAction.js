const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, stateName, actionName) {
  _.set(generator.meta, `states.${stateName}.actions.${actionName}`, {
    name: actionName,
    flowType: _.capitalize(actionName),
    id: `${stateName}/${_.toUpper(_.snakeCase(actionName))}`,
  })
  generator.updateMeta()

  generator.fs.copyTpl(
    templatePath('actions/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/actions/index.js`),
    {
      state: generator.getState(stateName),
      actions: generator.getActions(stateName),
    }
  )

  generator.fs.copyTpl(
    templatePath('actions/action.ejs'),
    generator.destinationPath(`src/state/${stateName}/actions/${actionName}.js`),
    {
      action: generator.getActions(stateName)[actionName],
    }
  )
}
