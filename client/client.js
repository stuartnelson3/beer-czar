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

Template.beerList.rendered = function() { update(); };

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
    update();
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
                .attr('class', 'chart')
                .attr('width', 960)
                .attr('height', 20 * beers.length);

  var bar_data = chart.selectAll('rect').data(votes);
  var chart_text = chart.selectAll('text').data(beers);

  transitionBarData(bar_data, xScale(votes));
  transitionText(chart_text, xScale(votes));

};

var transitionBarData = function(barData, xScale) {
  barData.enter().append('rect')
        .attr('y', function(d, i) { return i * 20; })
        .attr('width', xScale) // relative length
        .attr('height', 20);

  barData.transition().duration(750)
        .attr('width', xScale);

  barData.exit()
        .transition().duration(750)
        .attr('width', xScale)
        .remove();
};

var transitionText = function(chartText, xScale) {
  chartText.transition().duration(750)
        .attr('x', function(d) {return xScale(d.votes);})
        .text(function(d) {return d.name+': '+d.votes+' votes'});

  chartText
       .enter().append('text')
       .attr('x', function(d,i) {return xScale(d.votes);})
       .attr('y', function(d,i) { return i*20+10;})
       .attr('dx', -3) // padding-right
       .attr('dy', '.35em') // vertical-align: middle
       .attr('text-anchor', 'end') // text-align: right
       .text(function(d) { return d.name + ': ' + d.votes + ' votes'; });
};

var xScale = function(domain) {
  return  d3.scale.linear()
            .domain([0, d3.max(domain)])
            .range([0, 480]);
};
