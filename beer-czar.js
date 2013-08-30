Beers = new Meteor.Collection('beers');

Beers.allow({
  insert: function(userId) {
    return !!userId;
  },

  remove: function(userId, post) {
    return !!userId;
  }
})
