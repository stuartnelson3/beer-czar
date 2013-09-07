Template.profile.helpers({
  hasVotedForBeer: function() {
    if (Meteor.user().profile.chosenBeer && Meteor.user().profile.chosenBeer.length) return true;
    else return false;
  },

  userPreferredBeer: function() {
    return Meteor.user().profile.chosenBeer;
  }
});
