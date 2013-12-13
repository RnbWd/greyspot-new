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

    $(function () {
        $('.tlt').textillate();
    });
});
