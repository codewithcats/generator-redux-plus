const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, stateName, channelName) {
  const meta = generator.meta

  if (meta.states[stateName].channels[channelName]) {
    generator.log(`Channel [${channelName}] already been created. Aborted.`)
    return
  }

  _.set(meta, `states.${stateName}.channels.${channelName}`, {
    name: channelName,
  })

  generator.updateMeta()

  generator.fs.copyTpl(
    templatePath('channels/channel.ejs'),
    generator.destinationPath(`src/state/${stateName}/channels/${channelName}.js`),
    { channel: generator.getState(stateName).channels[channelName], },
  )

  generator.fs.copyTpl(
    templatePath('channels/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/channels/index.js`),
    {
      channels: generator.getChannels(stateName),
      state: generator.getState(stateName),
    },
  )
}
