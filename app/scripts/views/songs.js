/*global greyspot, Backbone, JST*/

greyspot.Views = greyspot.Views || {};

greyspot.Views.SongsView = Backbone.View.extend({

  el: '#songs',

  template: JST['app/scripts/templates/songs.ejs'],

  events: {
    //'widgetLoad' : 'createSong'
  },

  initialize: function () {
    this.render();

    this.listenTo(this.collection, 'add', this.addSongItem);
    this.listenTo(this.collection, 'reset', this.addAllSongItems);
    this.listenTo(widgetLoad, 'ready', this.createSong);
    this.listenTo(widgetPause, 'pause', this.toggleButton);
    this.listenTo(widgetPlay, 'play', this.toggleButton);
    this.listenTo(widgetPlay, 'currentSound', this.checkPlay);
    this.listenTo(widgetProgress, 'fire', this.checkProgress);
    this.collection.fetch();
    //setTimeout(this.checkPause, 2500);
  },

  render: function () { 
    this.$el.html(this.template());
    this.createSkips();
    return this;
  },

  createSong: function () {  

    var self = this;

    widget.getSounds(function(data) {

      for (var i = 0; i < data.length; i++) {

          var id = data[i].id;
          var title = data[i].title;
          var waveform = data[i].waveform_url;
          var artwork = data[i].artwork_url;
          var remove = title.indexOf("-");
          if (remove != -1)
            title = title.substring(0, remove);
          self.collection.create(new greyspot.Models.SongModel({
              id: id,
              index: i,
              title: title,
              waveform: waveform,
              artwork: artwork
          }));
      } //end forLoop
    });//end getSounds
  },
  createSkips: function() {
    var self = this;
    for (var i = 0; i < 100; i++) {
      self.$('#skipper').append('<span id="s'+i+'"></span>');
    }
  },
  addSongItem: function (song) { 
    var view = new greyspot.Views.SongView({ model: song });
    this.$('ul').append(view.render().el);
  },

  addAllSongItems: function () { 
    this.collection.each(this.addSongItem, this);
  },
  //update play/pause icons for non-playing songs and update title when play/pause triggered
  checkPlay: function (data) {
    var $title = this.$('#song-title');
    this.collection.each(function(model) {
      if (data.id != model.id && model.attributes.playing) {
        model.toggle();
      } else if (data.id == model.id) {
        $title.html(model.attributes.title);
      }
    });
  },
  //update progress bar while playing
  checkProgress: function(data) {
    this.$('.progress-bar').css({'width': data.position});
  },
  //update play/pause icons for song playing
  toggleButton: function() {
      this.$('#player').toggleClass('alert-info').toggleClass('alert-danger');
      this.$('.player-play').toggleClass('glyphicon-pause').toggleClass('glyphicon-play');

  }
});

