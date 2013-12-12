/*global greyspot, Backbone, JST*/

greyspot.Views = greyspot.Views || {};

greyspot.Views.SongsView = Backbone.View.extend({

  el: '#grey-app',

  template: JST['app/scripts/templates/songs.ejs'],

  events: {
    //'widgetLoad' : 'createSong'
  },

  initialize: function () {
    this.render();

    this.listenTo(this.collection, 'add', this.addSongItem);
    this.listenTo(this.collection, 'reset', this.addAllSongItems);
    this.listenTo(widgetLoad, 'fire', this.createSong);
    this.collection.fetch();
  },

  render: function () { 
    this.$el.html(this.template());

    return this;
  },

  createSong: function () {  

    var self = this;

    widget.getSounds(function(data) {

      for (var i = 0; i < data.length; i++) {

          var title = data[i].title;
          var waveform = data[i].waveform_url;
          var artwork = data[i].artwork_url;

          self.collection.create(new greyspot.Models.SongModel({
              title: title,
              waveform: waveform,
              artwork: artwork
          }));
      } //end forLoop
    });//end getSounds
  },

  addSongItem: function (song) { 
    var view = new greyspot.Views.SongView({ model: song });
    this.$('ul').append(view.render().el);
  },

  addAllSongItems: function () { 
    this.collection.each(this.addSongItem, this);
  }

});

