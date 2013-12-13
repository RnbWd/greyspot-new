/*global greyspot, Backbone*/

//greyspot.Models = greyspot.Models || {};

greyspot.Models.SongModel = Backbone.Model.extend({

  defaults: {
      id: '',
      index: '',
      title: '',
      artwork: '',
      waveform: '',
      playing: false
  },
  toggle: function () {
        this.save({
            playing: !this.get('playing')
        });
    }

});


