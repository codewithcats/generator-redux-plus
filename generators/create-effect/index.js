const StateGenerator = require('../StateGenerator')
const createEffects = require('../../libs/createEffects')

module.exports = class CreateEffects extends StateGenerator {

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
        name: 'effectName',
        message: 'Enter effect name:',
      },
    ])
    .then(answers => {
      this.answers = answers
    })
  }

  writing() {
    const { stateName, effectName } = this.answers
    createEffects(this, stateName, effectName)
  }

  end() {
    this.answers = {}
  }

}
