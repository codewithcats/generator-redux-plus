const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, stateName, actionName) {
  const action = generator.getActions(stateName)[actionName]
  action.reducer = true
  generator.updateMeta()

  const state = generator.getState(stateName)
  const reducer = generator.getReducers(stateName)[actionName]

  generator.fs.copyTpl(
    templatePath('reducers/reducer.ejs'),
    generator.destinationPath(`src/state/${stateName}/reducers/${actionName}.js`),
    {
      state,
      action,
    }
  )
}
