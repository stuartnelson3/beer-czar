Template.beerList.helpers({
  beers: function() {
    return Beer.find();
  },

  isAdmin: function(user) {
    return user.services.google.email == 'stuart.nelson@neo.com'
  },

  hasVotes: function(user) {
    return user.profile.voteCount > 0;
  }
});

Template.addBeer.events({
  'click .js-addBeer': function(event, template) {
    var beerName = document.querySelector('.js-newBeerName').value;

    Meteor.call('addBeer', beerName);
  }

});

Template.beerList.events({
  'click .js-removeBeer': function(event, template) {
    var id = event.target.getAttribute('data-id');

    Meteor.call('removeBeer', id);
  },

  'click .js-vote': function(event, template) {
    var id = event.target.getAttribute('data-id');

    Meteor.call('upvoteBeer', id);
  }
});
