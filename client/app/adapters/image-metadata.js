import Ember from 'ember'
import DS from 'ember-data'
import config from '../config/environment'

const { inject, get } = Ember

export default DS.Adapter.extend({
  ajax: inject.service(),
  host: config.apiHost,
  namespace: config.apiNamespace,
  findRecord () {
    // load from cache
  },
  createRecord () {
    // no op :(
  },
  updateRecord () {
    // no op :(
  },
  deleteRecord () {
    // no op :(
  },
  findAll (store, type, sinceToken) {
    return get(this, 'ajax').request(get(this, 'host') + get(this, 'namespace') + '/data.json')
  }
})
