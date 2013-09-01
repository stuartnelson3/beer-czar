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
    update();
  }

});

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

Template.graph.rendered = function() {
  update();
};

var update = function() {
  var beers = Beer.find().fetch();
  var votes = Beer.find().map(function(b) {
    return b.votes;
  });

  var chart = d3.select('svg')
                .attr("class", "chart")
                .attr("width", 960)
                .attr("height", 20 * beers.length);

  var x = d3.scale.linear()
            .domain([0, d3.max(votes)])
            .range([0, 480]);

  // make me work with attr('y') below
  var y = d3.scale.ordinal()
            .domain([0,1,2,3])
            .rangeBands([0, 120]);

  var bar_data = chart.selectAll("rect").data(votes);

  bar_data
       .enter().append("rect")
       .attr("y", function(d, i) { return i * 20; })
       .attr("width", x) // relative length
       .attr("height", 20);

  bar_data.transition().duration(750)
  .attr('width', function(d) {return x(d)});

  chart.selectAll("text")
       .data(beers)
       .enter().append("text")
       .attr("x", function(d,i) {return x(d.votes);})
       .attr("y", function(d,i) { return i*20+10;})
       .attr("dx", -3) // padding-right
       .attr("dy", ".35em") // vertical-align: middle
       .attr("text-anchor", "end") // text-align: right
       .text(function(d) { return d.name + ': ' + d.votes + ' votes'; });
};
