/*global greyspot, Backbone*/

//greyspot.Models = greyspot.Models || {};

greyspot.Models.SongModel = Backbone.Model.extend({

  defaults: {
      title: '',
      completed: false
  },

  toggle: function () {
      this.save({
          completed: !this.get('completed')
      });
  }

});


