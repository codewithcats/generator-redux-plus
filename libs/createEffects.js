const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, stateName, effectName) {
  _.set(generator.meta, `states.${stateName}.effects.${effectName}`, {
    name: effectName,
  })
  generator.updateMeta()

  generator.fs.copyTpl(
    templatePath('effects/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/effects/index.js`),
    {
      state: generator.getState(stateName),
      effects: generator.getEffects(stateName),
    }
  )

  generator.fs.copyTpl(
    templatePath('effects/effect.ejs'),
    generator.destinationPath(`src/state/${stateName}/effects/${effectName}.js`),
    {
      state: generator.getState(stateName),
      effects: effectName,
    }
  )

  generator.fs.copyTpl(
    templatePath('store.ejs'),
    generator.destinationPath('src/state/store.js'),
    generator.meta
  )
}
