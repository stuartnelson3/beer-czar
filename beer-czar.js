Beer = new Meteor.Collection('beer');

Beer.allow({
  insert: function(userId) {
    return !!userId;
  },

  remove: function(userId, post) {
    return !!userId;
  }
})
