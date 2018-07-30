const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, stateName, channelsName) {
  channelsName.forEach(channel => {
    _.unset(generator.meta, `states.${stateName}.channels.${channel}`)
  })

  generator.updateMeta()

  channelsName.forEach(channel => {
    generator.fs.delete(
      generator.destinationPath(
        `src/state/${stateName}/channels/${channel}.js`,
      ),
    )
  })

  generator.fs.copyTpl(
    templatePath('channels/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/channels/index.js`),
    {
      channels: generator.getChannels(stateName),
      state: generator.getState(stateName),
    },
  )
}
