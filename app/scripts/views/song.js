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
    this.listenTo(widgetPause, 'pause', this.checkPause);
    this.listenTo(widgetPlay, 'play', this.checkPlay);
    this.listenTo(this.model, 'change:playing', this.togglePlay);
  },

  render: function () {
    this.$el.addClass('list-group-item').html(this.template(this.model.toJSON()));
    this.waveform();
    return this;
  },
  checkPause: function() {
     var self = this;
     var model= self.model;
     widget.getCurrentSound(function(data) {
      if (model.attributes.id == data.id) {
        //model.toggle();
        self.togglePlay(false);
        //console.log(model.attributes.title);
      }
    });
    
  },
  checkPlay: function() {
     var self = this;
     var model= this.model;
     widget.getCurrentSound(function(data) {
      if (model.attributes.id == data.id && !model.attributes.playing) {
        model.toggle();
        self.togglePlay(true);
      } else if (model.attributes.id == data.id && model.attributes.playing) {
        //model.toggle();
        self.togglePlay(true);
      } else if (model.attributes.playing) {
        model.toggle();
        self.togglePlay(false);
      }
    });
    
  },
  waveform: function() {
    this.$el.css({'background-image':'url('+this.model.get('waveform')+')', 'background-size': 'cover'});
  },

  enter: function() {
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
    var model = this.model;

    widget.getCurrentSound(function(data) {
      if (id == data.id) {
        widget.toggle();
        //model.toggle();
      } else {
        widget.skip(index);
        //model.toggle();
      }
    });

  },


  togglePlay: function(data) {
    var self = this;
    if (self.model.attributes.playing && data) {
      self.$('.play').removeClass('glyphicon-play').addClass('glyphicon-pause');
      //console.log(self.model.attributes.title);
    }
    else if (!data) {
      self.$('.play').addClass('glyphicon-play').removeClass('glyphicon-pause');
      //console.log(self.model.attributes.title);
    }
    
  }
});


