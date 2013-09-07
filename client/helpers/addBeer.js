Template.addBeer.helpers({
  hasVotes: function() {
    return Meteor.user().profile.voteCount > 0;
  }
});
