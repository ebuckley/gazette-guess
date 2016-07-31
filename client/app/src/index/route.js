import Ember from 'ember'
const { get, set } = Ember

export default Ember.Route.extend({
  page: 1,
  count: 0,
  model: function () {
    return this.store.query('ImageMetadata', {
      page: get(this, 'page')
    })
    .then(im => im.toArray()[get(this, 'count')])
  },
  init: function() {
    this.poll()
  },
  poll: function() {
    var _this = this;
    var count = get(this, 'count')
    var page = get(this, 'page')
    var newCount = count + 1
    if (newCount >= 20) {
      newCount = 0
      set(this, 'page', page + 1)
    }
    set(this, 'count', newCount)
    Ember.run.later( function() {
       _this.refresh();
       _this.poll();
    }, 10000); // 10s
 }.observes('didLoad'),
  actions: {
    previous () {
      const page = get(this, 'page')
      if (page !== 1) {
        set(this, 'page', page - 1)
        this.refresh()
      }
    },
    next () {
      const page = get(this, 'page')
      set(this, 'page', page + 1)
      this.refresh()
    }
  }
})
