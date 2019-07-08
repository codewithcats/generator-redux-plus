const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function (generator, stateName, reducerName) {
  const actions = generator.getActions(stateName)[reducerName]

  reducerName.forEach(reducer => {
    _.unset(generator.meta, `states.${stateName}.actions.${reducer}.reducer`)
  })

  generator.updateMeta()

  reducerName.forEach(reducer => {
    generator.fs.delete(
      generator.destinationPath(
        `src/state/${stateName}/reducers/${reducer}.js`,
      ),
    )
  })

  const actionsWithReducer = Object.values(generator.getActions(stateName))
    .filter(action => action.reducer === true)

  generator.fs.copyTpl(
    templatePath('reducers/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/reducers/index.js`),
    {
      actions: actionsWithReducer,
      state: generator.getState(stateName),
    },
  )
} 