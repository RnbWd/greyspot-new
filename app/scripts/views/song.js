/*global greyspot, Backbone, JST*/

greyspot.Views = greyspot.Views || {};

greyspot.Views.SongView = Backbone.View.extend({

  tagName: 'li',

  template: JST['app/scripts/templates/song.ejs'],

  events: {
    'mouseenter' : 'enter',
    'mouseleave' : 'leave',
    'click .waveOn': 'bannerOn',
    'click .waveOff': 'bannerOff',
    'click': 'togglePlay'
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
    this.$('.play').removeClass('hidden');
  },
  leave: function() {
    this.$el.css({'background-color': '#fafafa', 'color': 'black'});
    this.$('.play').addClass('hidden');
  },
  bannerOn: function() {
    this.togglePlay();
    this.$('.drop').toggleClass('waveOn').toggleClass('waveOff');
    $('#banner').html('<img src="'+this.model.attributes.waveform+'" class="img-responsive"/>');
  },
  bannerOff: function(){
    this.togglePlay();
    this.$('.drop').toggleClass('waveOff').toggleClass('waveOn');
    $('#banner img').addClass('hide');
  },
  togglePlay: function() {
    widget.toggle();
    this.$('.play').toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
    $('.player-play').toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
  }
});


