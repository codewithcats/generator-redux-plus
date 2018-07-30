const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, stateName, actionName) {
  const action = generator.getActions(stateName)[actionName]
  action.reducer = true
  generator.updateMeta()

  const state = generator.getState(stateName)

  generator.fs.copyTpl(
    templatePath('reducers/reducer.ejs'),
    generator.destinationPath(`src/state/${stateName}/reducers/${actionName}.js`),
    {
      state,
      action,
    }
  )

  const actionsWithReducer = Object.values(generator.getActions(stateName))
    .filter(action => action.reducer === true)

  generator.fs.copyTpl(
    templatePath('reducers/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/reducers/index.js`),
    {
      state,
      actions: actionsWithReducer,
    }
  )
}
