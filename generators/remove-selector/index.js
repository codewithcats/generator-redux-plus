const StateGenerator = require('../StateGenerator')
const removeSelector = require('../../libs/removeSelector')

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
        const selectors = Object.values(this.getSelectors(answers.stateName))

         if (selectors.length < 1) {
          this.log(
            'No selectors available in this state or all of them already have reducer. Aborted',
          )
          throw new Error('No selectors available')
        }

         return this.prompt([
          {
            type: 'checkbox',
            name: 'selectorsName',
            message: 'Select a selectors:',
            choices: selectors,
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
    const { stateName, selectorsName } = this.answers
    removeSelector(this, stateName, selectorsName)
  }

   end() {
    this.answers = {}
  }
}  