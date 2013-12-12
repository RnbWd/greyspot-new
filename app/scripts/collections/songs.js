/*global greyspot, Backbone*/

//greyspot.Collections = greyspot.Collections || {};

greyspot.Collections.SongsCollection = Backbone.Collection.extend({

    localStorage: new Backbone.LocalStorage('backbone-generator-songs'),

    initialize: function () {
      //this.each(function(model) { model.destroy(); } );
      this.model =  greyspot.Models.SongModel;
    }

});


