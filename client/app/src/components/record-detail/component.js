import Ember from 'ember';
import moment from 'npm:moment'
import player from 'client/utils/player'

const { set, get } = Ember

export default Ember.Component.extend({

  didReceiveAttrs() {
    const record = get(this, 'record')

    var year = moment(get(record, 'display_date')).year()
    var notes = [
      (get(record, 'description').length % 8) + 1,
      (parseInt(year, 10) % 8) + 1,
      (get(record, 'title').length % 8) + 1,
      (get(record, 'id') % 8) + 1,
      1
    ]

    var j = 0
    notes.forEach(function (note) {
      setTimeout(function () {
        player.playNote(note ? note : 1)
      }, 750 * j)
      j++
    })
  }
});
