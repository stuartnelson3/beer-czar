Template.beerList.helpers({
  beers: function() {
    return Beer.find();
  },

  isAdmin: function() {
    return Meteor.user() && Meteor.user().services.google.email == 'stuart.nelson@neo.com';
  },

  canUpvote: function(beerName) {
    return Meteor.user().profile.voteCount > 0 && Meteor.user().profile.chosenBeer.indexOf(beerName) === -1;
  },

  canDownvote: function(beerName) {
    return (Meteor.user().profile.voteCount < 3 && Meteor.user().profile.chosenBeer.indexOf(beerName) >= 0);
  }
});
