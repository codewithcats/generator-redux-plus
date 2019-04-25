const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function (generator, stateName, selectorsName) {
  // const selectors = generator.getActions(stateName)[selectorsName]
  // console.log('6', selectors)
  console.log('7', selectorsName)
  selectorsName.forEach(selector => {
    _.unset(generator.meta, `states.${stateName}.selectors.${selector}`)
  })

  generator.updateMeta()

  selectorsName.forEach(selector => {
    generator.fs.delete(
      generator.destinationPath(
        `src/state/${stateName}/selectors/${selector}.js`,
      ),
    )
  })

  generator.fs.copyTpl(
    templatePath('selectors/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/selectors/index.js`),
    {
      selectors: selectorsName,
      state: generator.getState(stateName),
    },
  )
}  