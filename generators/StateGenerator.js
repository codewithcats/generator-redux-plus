const _ = require('lodash')
const Generator = require('yeoman-generator')
const getMetaPath = require('../libs/getMetaPath')

module.exports = class StateGenerator extends Generator {

  constructor(args, opts) {
    super(args, opts)

    this.metaPath = getMetaPath(this)
    this.meta = this.fs.readJSON(this.metaPath)
    this.states = Object.keys(this.meta.states)
  }

  updateMeta(newMeta = this.meta) {
    this.fs.writeJSON(this.metaPath, newMeta)
    this.meta = newMeta
  }

  getState(stateName) {
    return this.meta.states[stateName]
  }

  getActionTypes(stateName) {
    return _.map(this.getActions(stateName), (act => act.type))
  }

  getActions(stateName) {
    return this.getState(stateName).actions
  }

  getActionNames(stateName) {
    return Object.keys(this.getActions(stateName))
  }

  getChannels(stateName) {
    return this.getState(stateName).channels
  }

  getEffects(stateName) {
    return this.getState(stateName).effects
  }

}
