const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function (generator, stateName, actionName) {
  actionName.forEach(action => {
    _.unset(generator.meta, `states.${stateName}.actions.${action}`)
  })

  generator.updateMeta()

  actionName.forEach(action => {
    generator.fs.delete(
      generator.destinationPath(
        `src/state/${stateName}/actions/${action}.js`,
      ),
    )
  })

  generator.fs.copyTpl(
    templatePath('effects/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/actions/index.js`),
    {
      effects: generator.getActions(stateName),
      state: generator.getState(stateName),
    },
  )
}