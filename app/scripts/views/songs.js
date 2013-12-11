/*global greyspot, Backbone, JST*/

greyspot.Views = greyspot.Views || {};

greyspot.Views.SongsView = Backbone.View.extend({

  el: '#grey-app',

  template: JST['app/scripts/templates/songs.ejs'],

  events: {
    'submit': 'createSong'
  },

  initialize: function () {
    this.render();

    this.listenTo(this.collection, 'add', this.addSongItem);
    this.listenTo(this.collection, 'reset', this.addAllSongItems);

    this.collection.fetch();
  },

  render: function () { 
    this.$el.html(this.template());

    return this;
  },

  createSong: function () {  

    event.preventDefault();

    var title = this.$('#new-song').val().trim();

    if (title) {
        this.collection.create(new greyspot.Models.SongModel({
            title: title
        }));

        $('#new-song').val('');
    }
  },

  addSongItem: function (song) { 
    var view = new greyspot.Views.SongView({ model: song });
    this.$('ul').append(view.render().el);
  },

  addAllSongItems: function () { 
    this.collection.each(this.addSongItem, this);
  }

});

