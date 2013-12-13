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
    
    this.listenTo(this.model, 'change:playing', this.togglePlay);
  },

  render: function () {
    this.$el.addClass('list-group-item').html(this.template(this.model.toJSON()))
    this.waveform();
    return this;
  },

  waveform: function() {
    this.$el.css({'background-image':'url('+this.model.get('waveform')+')', 'background-size': 'cover'});
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
  toggleSkip: function() {
    var id = this.model.attributes.id;
    var index = this.model.attributes.index;

    widget.getCurrentSound(function(data) {
      if (id == data.id) {
        widget.toggle();
     
      } else {
        widget.skip(index);
       
      }
    });

    this.model.toggle();

  },
  togglePlay: function() {
  
    this.$('.play').toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
    
  }
});


