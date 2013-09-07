Template.userStatistics.helpers({
  usersWithVotes: function() {
    return Meteor.users.find({'profile.voteCount':{$gt:0}}).fetch();
  }
})
