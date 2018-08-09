const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, stateName, effectsName) {
  effectsName.forEach(effect => {
    _.unset(generator.meta, `states.${stateName}.effects.${effect}`)
  })

  generator.updateMeta()

  effectsName.forEach(effect => {
    generator.fs.delete(
      generator.destinationPath(
        `src/state/${stateName}/effects/${effect}.js`,
      ),
    )
  })

  generator.fs.copyTpl(
    templatePath('effects/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/effects/index.js`),
    {
      effects: generator.getEffects(stateName),
      state: generator.getState(stateName),
    },
  )
}
