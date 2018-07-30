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
      const actions = Object.values(this.getActions(answers.stateName))
        .filter(action => action.reducer !== true)
        .map(action => action.name)

      if (actions.length < 1) {
        this.log('No action available in this state or all of them already have reducer. Aborted')
        throw new Error('No action available')
      }

      return this.prompt([
        {
          type: 'list',
          name: 'actionName',
          message: 'Select an action',
          choices: actions,
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
    createReducer(this, stateName, actionName)
  }

  end() {
    this.answers = {}
  }
}
