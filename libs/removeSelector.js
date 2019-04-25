const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function (generator, stateName, selectorsName) {
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
      selectors: generator.getSelectors(stateName),
      state: generator.getState(stateName),
    },
  )
}  