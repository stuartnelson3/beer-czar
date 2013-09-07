Template.addBeer.events({
  'click .js-addBeer': function(event, template) {
    var $beerName = document.querySelector('.js-newBeerName');

    Meteor.call('addBeer', $beerName.value);
  }
});
