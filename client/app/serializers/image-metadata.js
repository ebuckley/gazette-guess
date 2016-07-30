import JSONSerializer from 'ember-data/serializers/json'

export default JSONSerializer.extend({
  normalizeResponse (store, primaryModelClass, payload, id, requestType) {
    // mangle it to look like jsonapi response...
    return {
      data: payload.search.results.map(item => ({
        id: item.id,
        type: 'image-metadata',
        data: item
      }))
    }
  }
})
