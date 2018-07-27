const _ = require('lodash')
const StateGenerator = require('../StateGenerator')
const createChannel = require('../../libs/createChannel')

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
      {
        type: 'input',
        name: 'channelName',
        message: 'Enter channel name:',
      },
    ])
    .then(answers => {
      this.answers = answers
    })
  }

  writing() {
    const {stateName, channelName} = this.answers
    createChannel(this, stateName, channelName)
  }
  
  end() {
    this.answers = {}
  }
}