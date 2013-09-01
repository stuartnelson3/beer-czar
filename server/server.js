Accounts.validateNewUser(function(user) {
  // beef up this regex?
  if (user['services']['google']['email'].search(/@neo.com$/) > 0)
    return true;
  throw new Meteor.Error(403, "You need to have a neo.com email address!");
});

Accounts.onCreateUser(function(options, user) {
  user.profile = options.profile;
  user.profile['voteCount'] = 3;

  return user;
});

Meteor.methods({
  addBeer: function(name) {
    if (uniqueName(name))
      Beer.insert({name: name, votes: 0});
  },

  uniqueName: function(name) {
    return Beer.find({name: name}).length;
  },

  removeBeer: function(id) {
    Beer.remove(id);
  }

});
