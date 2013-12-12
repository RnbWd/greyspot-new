/*global greyspot, Backbone*/

//greyspot.Models = greyspot.Models || {};

greyspot.Models.SongModel = Backbone.Model.extend({

  defaults: {
      title: '',
      artwork: '',
      waveform: ''
  }

});


