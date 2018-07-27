const _ = require('lodash')
const templatePath = require('./templatePath')

module.exports = function(generator, stateName, channelName) {
  const metaPath = generator.destinationPath('src/state/__state__/meta.json')
  const meta = generator.fs.readJSON(metaPath)

  if (meta.states[stateName].channels[channelName]) {
    generator.log(`Channel [${channelName}] already been created. Aborted.`)
    return
  }

  meta.states[stateName].channels[channelName] = {
    name: channelName
  }
  
  generator.updateMeta()

  generator.fs.writeJSON(metaPath, meta)

  generator.fs.copyTpl(
    templatePath('channels/channel.ejs'),
    generator.destinationPath(`src/state/${stateName}/channels/${channelName}.js`),
    { channel: channelName },
  )

  generator.fs.copyTpl(
    templatePath('channels/index.ejs'),
    generator.destinationPath(`src/state/${stateName}/channels/index.js`),
    { channels: generator.getChannels(stateName), state: stateName },
  )
}