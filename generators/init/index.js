const Generator = require('yeoman-generator')
const init = require('../../libs/init')

module.exports = class Init extends Generator {

  constructor(args, opts) {
    super(args, opts)

    this.option('install', {
      desc: 'Install dependencies during intialization',
      type: Boolean,
      default: false,
    })
  }

  install() {
    if (this.options.install) {
      this.yarnInstall(
        ['redux', 'redux-saga', 'router5', 'redux-router5']
      )
      this.yarnInstall(
        ['flow-bin'], {dev: true}
      )
    }
  }

  writing() {
    this.meta = {
      states: {},
    }
    init(this)
  }

}
