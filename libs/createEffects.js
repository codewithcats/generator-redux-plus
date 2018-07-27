const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, stateName, effectName) {
  const effectType = `${_.capitalize(_.camelCase(effectName))}Effect`
  const metaPath = generator.destinationPath('src/state/__state__/meta.json')
  const meta = generator.fs.readJSON(metaPath)

  if (meta.states[stateName].effects[effectName]) {
    console.log(`State [${effectName}] already been created. Aborted.`)
    return
  }

  generator.meta = _.set(generator.meta, `states.${stateName}.effects.${effectName}`, {
    name: effectName,
  })
  generator.updateMeta()

  generator.fs.copyTpl(
    templatePath('effects/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/effects/index.js`),
    {
      state: stateName,
      effects: generator.getEffects(stateName),
    }
  )

  generator.fs.copyTpl(
    templatePath('effects/effect.ejs'),
    generator.destinationPath(`src/state/${stateName}/effects/${effectName}.js`),
    {
      state: generator.meta.states[stateName],
      effects: effectName,
    }
  )

  generator.fs.copyTpl(
    templatePath('store.ejs'),
    generator.destinationPath('src/state/store.js'),
    meta
  )
}
