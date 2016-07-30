import Ember from 'ember'
const { get } = Ember

export default Ember.Route.extend({
  model: function () {
    return {
      loggedIn: get(this, 'session.isAuthenticated')
    }
  },
  afterModel: function (model) {
    this._super(...arguments)
    // redirect to the dashboard
    if (model.loggedIn) {
      this.transitionTo('permits')
    }
  }
})
