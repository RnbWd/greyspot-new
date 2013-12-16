/*global greyspot, $*/

localStorage.clear();

window.greyspot = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        new this.Views.SongsView({
            collection: new this.Collections.SongsCollection()
        });    
    }
};

var widgetLoad = {};
    _.extend(widgetLoad, Backbone.Events);

var widgetFinish = {};
    _.extend(widgetFinish, Backbone.Events);

var widgetPlay = {};
    _.extend(widgetPlay, Backbone.Events);

var widgetPause = {};
    _.extend(widgetPause, Backbone.Events);

var widgetProgress = {};
    _.extend(widgetProgress, Backbone.Events);


$(document).ready(function () {
    
    greyspot.init();

    var iframe = document.getElementById('grey');

    widget = SC.Widget(iframe);

    widget.bind(SC.Widget.Events.READY, function() {
        widgetLoad.trigger('ready');
        widget.toggle().toggle();
    });

    widget.bind(SC.Widget.Events.PLAY , function(data) {
        widgetPlay.trigger('play');
        widget.getCurrentSound(function(data) {
            widgetPlay.trigger('currentSound', {id: data.id});
        });
    });
    
    widget.bind(SC.Widget.Events.FINISH , function() {
        widgetFinish.trigger('finish');
    });

    widget.bind(SC.Widget.Events.PAUSE , function() {
        widgetPause.trigger('pause');
    });

    widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(data) {
        widgetProgress.trigger('fire',{position: (data.relativePosition*100).toFixed(1)+"%"});
    });    

      /*$('.tlt').textillate({
        // the default selector to use when detecting multiple texts to animate
        selector: '.texts',

        // enable looping
        loop: true,

        // sets the minimum display time for each text before it is replaced
        minDisplayTime: 500,

        // sets the initial delay before starting the animation
        // (note that depending on the in effect you may need to manually apply 
        // visibility: hidden to the element before running this plugin)
        initialDelay: 0,

        // set whether or not to automatically start animating
        autoStart: false,

        // custom set of 'in' effects. This effects whether or not the 
        // character is shown/hidden before or after an animation  
        inEffects: [],

        // custom set of 'out' effects
        outEffects: [],

        // in animation settings
        in: {
          // set the effect name
          effect: 'pulse',

          // set the delay factor applied to each consecutive character
          delayScale: 5,

          // set the delay between each character
          delay: 50,

          // set to true to animate all the characters at the same time
          sync: false,

          // randomize the character sequence 
          // (note that shuffle doesn't make sense with sync = true)
          shuffle: true,

          // reverse the character sequence 
          // (note that reverse doesn't make sense with sync = true)
          reverse: false,

          // callback that executes once the animation has finished
          callback: function () {}
        },

        // out animation settings.
        out: {
         effect: 'pulse',
          delayScale: 5,
          delay: 50,
          sync: false,
          shuffle: false,
          reverse: true,
          callback: function () {}
        },

        // callback that executes once textillate has finished 
        callback: function () {}
     
  });
*/
});
