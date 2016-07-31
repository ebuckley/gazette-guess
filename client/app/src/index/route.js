import Ember from 'ember'
import nlp from 'npm:nlp_compromise'
const { get, set } = Ember

export default Ember.Route.extend({
  page: 5,
  model: function () {
    console.log('hello nlp', nlp)
    return this.store.query('ImageMetadata', {
      page: get(this, 'page')
    })
    .then(im => {
      return im.toArray()[0]
      // set(this, 'active', im.toArray()[0])
    })
  },
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
