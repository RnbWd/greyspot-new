/*global greyspot, $*/


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

$(document).ready(function () {
    greyspot.init();
});