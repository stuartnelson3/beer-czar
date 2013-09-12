Template.profile.events({
  'click .js-weeklyReset': function(event, template) {
    if(confirm('Are you SURE you want to delete all beers and reset all users votes?'))
      Meteor.call('weeklyReset');
  }
});
