const StateGenerator = require('../StateGenerator')
const createSelector = require('../../libs/createSelector')

module.exports = class CreateSelector extends StateGenerator {

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
        name: 'selectorName',
        message: 'Enter selector name:',
      },
    ])
    .then(answers => {
      this.answers = answers
    })
  }

  writing() {
    const {
      stateName,
      selectorName,
    } = this.answers
    createSelector(this, stateName, selectorName)
  }

  end() {
    this.answers = {}
  }
}
