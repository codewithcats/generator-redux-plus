const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, stateName, actionName) {
  const meta = generator.meta
  _.set(meta, `states.${stateName}.actions.${actionName}`, {
    name: actionName,
    flowType: _.capitalize(actionName),
    code: `${stateName}/${_.toUpper(_.snakeCase(actionName))}`,
  })
  generator.updateMeta()

  generator.fs.copyTpl(
    templatePath('actions/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/actions/index.js`),
    {
      state: stateName,
      actions: meta.states[stateName].actions,
    }
  )

  generator.fs.copyTpl(
    templatePath('actions/action.ejs'),
    generator.destinationPath(`src/state/${stateName}/actions/${actionName}.js`),
    {
      action: meta.states[stateName].actions[actionName],
    }
  )
}
