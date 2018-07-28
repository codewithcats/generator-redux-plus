const _ = require('lodash')
const StateGenerator = require('../StateGenerator')
const createAction = require('../../libs/createAction')

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
        name: 'actionName',
        message: 'Enter action name:',
      },
    ])
    .then(answers => {
      this.answers = answers
    })
  }

  writing() {
    const {stateName, actionName} = this.answers
    createAction(this, stateName, actionName)
  }
}
