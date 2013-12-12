/*global greyspot, Backbone, JST*/

greyspot.Views = greyspot.Views || {};

greyspot.Views.SongView = Backbone.View.extend({

  tagName: 'li',

  template: JST['app/scripts/templates/song.ejs'],

  events: {
    'mouseenter' : 'enter',
    'mouseleave' : 'leave',
    'click': 'banner'
  },

  initialize: function () {
    this.render();
    //this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.addClass('list-group-item').html(this.template(this.model.toJSON()))
    this.$el.css({'background-image':'url('+this.model.attributes.waveform+')', 'background-size': 'cover'});

    return this;
  },
  enter: function() {
    //this.$('img').toggleClass('hide');
    this.$el.css({'background-color': 'orange', 'color': '#fafafa'});
  },
  leave: function() {
    this.$el.css({'background-color': '#fafafa', 'color': 'black'})
  },
  banner: function(){
    $('#banner').html('<img src="'+this.model.attributes.waveform+'" class="img-responsive"/>')
  }
  
});


