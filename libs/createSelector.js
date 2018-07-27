const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, stateName, selectorName) {
  generator.meta = _.set(generator.meta, `states.${stateName}.selectors.${selectorName}`, {
    name: selectorName,
  })
  generator.updateMeta()

  generator.fs.copyTpl(
    templatePath('selectors/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/selectors/index.js`),
    {
      state: stateName,
      selectors: generator.meta.states[stateName].selectors,
    }
  )
}
