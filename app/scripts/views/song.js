/*global greyspot, Backbone, JST*/

greyspot.Views = greyspot.Views || {};

greyspot.Views.SongView = Backbone.View.extend({

  tagName: 'li',

  template: JST['app/scripts/templates/song.ejs'],

  events: {

  },

  initialize: function () {
    this.render();
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.addClass('list-group-item').html(this.template(this.model.toJSON()));

    return this;
  }
  
});


