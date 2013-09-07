Template.beerList.events({
  'click .js-removeBeer': function(event, template) {
    var id = event.target.getAttribute('data-id');

    Meteor.call('removeBeer', id);
  },

  'click .js-removeVote': function(event, template) {
    var id = event.target.getAttribute('data-id');

    Meteor.call('downvoteBeer', id);
  },

  'click .js-addVote': function(event, template) {
    var id = event.target.getAttribute('data-id');

    Meteor.call('upvoteBeer', id);
  }
});
