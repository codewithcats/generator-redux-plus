const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, actionName) {
    const metaPath = generator.destinationPath('src/state/__state__/meta.json')
    const meta = generator.fs.readJSON(metaPath)

    if (meta.states[actionName]) {
      this.log(`Action [${actionName}] already been created. Aborted.`)
      return
    }

    meta.states[actionName] = {
      actions: actionName,
    }

    generator.fs.writeJSON(metaPath, meta)

    generator.fs.copyTpl(
      templatePath('actions/index.ejs'),
      generator.destinationPath(`src/state/${actionName}/actions/index.js`),
      {
        actions: actionName,
      }
    )
}
