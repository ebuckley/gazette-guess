import DS from 'ember-data'
import Ember from 'ember'
import config from 'client/config/environment'
const { attr } = DS
const { computed, get } = Ember
export default DS.Model.extend({
  updated_at: attr(),
  created_at: attr(),
  title: attr(),
  description: attr(),
  display_date: attr(),
  imageUrl: computed('id', function () {
    return config.apiHost + config.apiNamespace + '/image/' + get(this, 'id')
  })
})
