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
}
