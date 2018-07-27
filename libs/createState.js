const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, stateName) {
    const stateType = `${_.capitalize(_.camelCase(stateName))}State`
    const metaPath = generator.destinationPath('src/state/__state__/meta.json')
    const meta = generator.fs.readJSON(metaPath)

    if (meta.states[stateName]) {
      this.log(`State [${stateName}] already been created. Aborted.`)
      return
    }

    meta.states[stateName] = {
      name: stateName,
      flowType: stateType,
      actions: {},
      channels: {},
      effects: {},
      reducers: {},
    }

    generator.fs.writeJSON(metaPath, meta)

    generator.fs.copyTpl(
      templatePath('actions/index.ejs'),
      generator.destinationPath(`src/state/${stateName}/actions/index.js`),
      {
        state: stateName,
        actions: {},
      }
    )

    generator.fs.copyTpl(
      templatePath('channels/index.ejs'),
      generator.destinationPath(`src/state/${stateName}/channels/index.js`),
      {
        state: stateName,
        channels: {},
      }
    )

    generator.fs.copyTpl(
      templatePath('effects/index.ejs'),
      generator.destinationPath(`src/state/${stateName}/effects/index.js`),
      {
        state: stateName,
        effects: {},
      }
    )

    generator.fs.copyTpl(
      templatePath('reducers/initialState.ejs'),
      generator.destinationPath(`src/state/${stateName}/reducers/initialState.js`),
      {
        stateType,
      }
    )

    generator.fs.copyTpl(
      templatePath('reducers/index.ejs'),
      generator.destinationPath(`src/state/${stateName}/reducers/index.js`),
      {
        stateName,
        stateType,
        actions: [],
      }
    )

    generator.fs.copyTpl(
      templatePath('local.types.ejs'),
      generator.destinationPath(`src/state/${stateName}/types.js`),
      {
        stateType,
      }
    )

    generator.fs.copyTpl(
      templatePath('global.types.ejs'),
      generator.destinationPath(`src/state/types.js`),
      meta,
    )

    generator.fs.copyTpl(
      templatePath('store.ejs'),
      generator.destinationPath('src/state/store.js'),
      meta
    )
}
