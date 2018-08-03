const _ = require('lodash')
const StateGenerator = require('../StateGenerator')
const removeChannel = require('../../libs/removeChannel')

module.exports = class CreateAction extends StateGenerator {
  constructor(args, opts) {
    super(args, opts)
  }

  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'stateName',
        message: 'Select a state:',
        choices: this.states,
      },
    ])
      .then(answers => {
        this.answers = answers
        const channels = Object.values(this.getChannels(answers.stateName))
        
        if (channels.length < 1) {
          this.log(
            'No channel available in this state or all of them already have reducer. Aborted',
          )
          throw new Error('No channel available')
        }

        return this.prompt([
          {
            type: 'checkbox',
            name: 'channelsName',
            message: 'Select a channels:',
            choices: channels,
          },
        ])
      })
      .then(answers => {
        this.answers = {
          ...this.answers,
          ...answers,
        }
      })
  }

  writing() {
    const { stateName, channelsName } = this.answers
    removeChannel(this, stateName, channelsName)
  }

  end() {
    this.answers = {}
  }
}
