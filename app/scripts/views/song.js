/*global greyspot, Backbone, JST*/

greyspot.Views = greyspot.Views || {};

greyspot.Views.SongView = Backbone.View.extend({

  tagName: 'li',

  template: JST['app/scripts/templates/song.ejs'],

  events: {
    'mouseenter' : 'enter',
    'mouseleave' : 'leave',
    'click': 'toggleSkip'
  },

  initialize: function () {
    this.render();
    //this.listenTo(widgetFinish, 'fire', this.togglePlay);
    //this.listenTo(widgetPlay, 'fire', this.checkPlay);
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
  toggleSkip: function() {
    var id = this.model.attributes.id;
    var index = this.model.attributes.index;
    var self = this;
    widget.getCurrentSound(function(data) {
      if (id == data.id) {
        widget.toggle();
        self.togglePlay();
      } else {
        widget.skip(index);
        $('.on').removeClass('glyphicon-pause').addClass('glyphicon-play');
        self.togglePlay();
      }
    });

  },
  togglePlay: function() {
    var self = this;
  
    $('.player-play').removeClass('glyphicon-play').addClass('glyphicon-pause');
    
    
    this.$('.play').toggleClass('glyphicon-play').toggleClass('glyphicon-pause').toggleClass('on');
  }
});


