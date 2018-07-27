const _ = require('lodash')
const Generator = require('yeoman-generator')
const createState = require('../../libs/createState')

module.exports = class CreateState extends Generator {

  constructor(args, opts) {
    super(args, opts)

  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'stateName',
        message: 'Enter state name:',
      },
    ])
    .then(answers => {
      this.answers = answers
    })
  }

  writing() {
    const {stateName} = this.answers
    createState(this, stateName)
  }

  end() {
    this.answers = {}
  }
}
