Accounts.validateNewUser(function(user) {
  // beef up this regex?
  if (user['services']['google']['email'].search(/@neo.com$/) > 0)
    return true;
  throw new Meteor.Error(403, 'You need to have a neo.com email address!');
});

Accounts.onCreateUser(function(options, user) {
  user.profile = options.profile;
  user.profile['voteCount'] = 3;

  return user;
});

Meteor.methods({
  addBeer: function(name) {
    if (name.length && !Beer.find({name:name}).count()) {
      Beer.insert({name:name,votes:1});
      Meteor.users.update({_id:Meteor.userId()},{$inc:{'profile.voteCount':-1}})
    }
  },

  upvoteBeer: function(id) {
    Beer.update({_id:id},{$inc:{votes:1}});
    Meteor.users.update({_id:Meteor.userId()},{$inc:{'profile.voteCount':-1}})
  },

  downvoteBeer: function(id) {
    Beer.update({_id:id},{$inc:{votes:-1}});
    Meteor.users.update({_id:Meteor.userId()},{$inc:{'profile.voteCount':1}})
  },

  removeBeer: function(id) {
    Beer.update({_id:id},{$set:{votes:0}}); // hack to animate exit for graph
    Meteor.setTimeout(function() {Beer.remove(id)}, 750);
  }
});
