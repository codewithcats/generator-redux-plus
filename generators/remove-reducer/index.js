const _ = require('lodash')
const StateGenerator = require('../StateGenerator')
const removeReducer = require('../../libs/removeReducer')

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
        const reducers = Object.values(this.getActions(answers.stateName))
          .filter(action => action.reducer === true)

        if (reducers.length < 1) {
          this.log(
            'No reducers available in this state or all of them already have reducer. Aborted',
          )
          throw new Error('No reducers available')
        }

        return this.prompt([
          {
            type: 'checkbox',
            name: 'reducersName',
            message: 'Select a effects:',
            choices: reducers,
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
    const { stateName, reducersName } = this.answers
    removeReducer(this, stateName, reducersName)
  }

  end() {
    this.answers = {}
  }
} 