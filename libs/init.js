const templatePath = require('./templatePath')

/**
 * Intialize state and router directories
 *
 * @param {Generator} generator          Generator instance
 * @param {boolean} generateEditableFiles
 *
 */
module.exports = function init(generator) {

  generator.fs.writeJSON(
    generator.destinationPath('src/state/__state__/meta.json'),
    generator.meta
  )

  generator.fs.copy(
    templatePath('init/state/initialState.js'),
    generator.destinationPath('src/state/initialState.js')
  )

  generator.fs.copy(
    templatePath('init/.flowconfig'),
    generator.destinationPath('.flowconfig')
  )

  generator.fs.copyTpl(
    templatePath('init/router/index.js'),
    generator.destinationPath('src/router/index.js'),
    {}
  )

  generator.fs.copyTpl(
    templatePath('global.types.ejs'),
    generator.destinationPath(`src/state/types.js`),
    {
      ...generator.meta,
    }
  )

  generator.fs.copyTpl(
    templatePath('store.ejs'),
    generator.destinationPath('src/state/store.js'),
    generator.meta
  )

}
