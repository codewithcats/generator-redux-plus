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

  // console.log(meta.states[stateName].effects.[effectName])

  meta.states[stateName].effects[effectName] = {
    name: effectName
  }

  generator.fs.writeJSON(metaPath, meta)

  generator.fs.copyTpl(
    templatePath('effects/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/effects/index.js`),
    {
      state: stateName,
      effects: generator.getEffects(stateName),
    }
  )

  // effects: generator.getEffects(stateName),

  // {
  //   state: stateName,
  //   effects: {
  //     effectName: {
  //       name: effectName
  //     }
  //   },
  // }


  // generator.fs.copyTpl(
  //   templatePath('effect.ejs'),
  //   generator.destinationPath(`src/state/${stateName}/effects/${effectName}.js`),
  //   {effect: effectName,}
  // )
  //
  // generator.fs.copyTpl(
  //   templatePath('../../../templates/store.ejs'),
  //   generator.destinationPath('src/state/store.js'),
  //   meta
  // )

}
