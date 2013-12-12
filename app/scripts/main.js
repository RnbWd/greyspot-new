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


$(document).ready(function () {

    greyspot.init();

    var iframe = document.getElementById('grey');

    widget = SC.Widget(iframe);

    widget.bind(SC.Widget.Events.READY, function() {
        widgetLoad.trigger('fire');
    });

    widget.bind(SC.Widget.Events.PLAY , function() {
        widgetFinish.trigger('fire');
    });
    
    widget.bind(SC.Widget.Events.FINISH , function() {
        widgetPlay.trigger('fire');
    });

});
