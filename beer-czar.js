Beer = new Meteor.Collection('beer');

Beer.allow({
  insert: function(userId) {
    return !!userId;
  },

  update: function() {
    return true;
  },

  remove: function(userId, post) {
    return !!userId;
  }
});

Meteor.users.allow({
  update: function() {
    return true;
  }
})
