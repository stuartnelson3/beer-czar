Meteor.methods({
  addBeer: function(name) {
    if (name.length && !Beer.find({name:name}).count()) {
      Beer.insert({name:name,votes:1});
      Meteor.users.update(
        {_id:Meteor.userId()},
        {
          $inc:{'profile.voteCount':-1},
          $addToSet:{'profile.chosenBeer':name}
        }
      )
    }
  },

  upvoteBeer: function(id) {
    var beer = Beer.findOne({_id:id});

    Beer.update({_id:id},{$inc:{votes:1}}, function(){
      Meteor.users.update(
        {_id:Meteor.userId()},
        {
          $inc:{'profile.voteCount':-1},
          $addToSet:{'profile.chosenBeer':beer.name}
        }
      );
    });
  },

  downvoteBeer: function(id) {
    Beer.update({_id:id},{$inc:{votes:-1}});
    var beerName = Beer.findOne(id).name

    Meteor.users.update(
      {_id:Meteor.userId()},
      {$inc:{'profile.voteCount':1}, $pull:{'profile.chosenBeer':beerName}}
    )
  },

  removeBeer: function(id) {
    var beer = Beer.findOne(id).name
    Beer.update({_id:id},{$set:{votes:0}}); // hack to animate exit for graph
    Meteor.setTimeout(function() {
      Beer.remove(id);
      Meteor.users.update({'profile.chosenBeer':{$in:[beer]}},{$pull:{'profile.chosenBeer':beer},$inc:{'profile.voteCount':1}}, {multi: true});
    }, 750);
  }
});
