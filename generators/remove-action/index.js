const _ = require('lodash')
const StateGenerator = require('../StateGenerator')
const removeAction = require('../../libs/removeAction')

module.exports = class RemoveAction extends StateGenerator {
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

        if (actions.length < 1) {
          this.log(
            'No action available in this state or all of them already have reducer. Aborted',
          )
          throw new Error('No action available')
        }

        return this.prompt([
          {
            type: 'checkbox',
            name: 'actionsName',
            message: 'Select a actions:',
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
    const { stateName, actionsName } = this.answers
    removeAction(this, stateName, actionsName)
  }

  end() {
    this.answers = {}
  }
}