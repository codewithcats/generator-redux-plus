const StateGenerator = require('../StateGenerator')
const createReducer = require('../../libs/createReducer')

module.exports = class CreateReducer extends StateGenerator {

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
      return this.prompt([
        {
          type: 'list',
          name: 'actionName',
          message: 'Select an action',
          choices: this.getActionNames(answers.stateName),
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
    const {
      stateName,
      actionName,
    } = this.answers
    console.log(stateName)
    createReducer(this, stateName, actionName)
  }

  end() {
    this.answers = {}
  }
}
