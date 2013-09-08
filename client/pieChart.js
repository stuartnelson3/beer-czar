PieChart = function() {

  var render = function(updateFunction) {
    var users = Meteor.users.find().fetch();
    // var users = Meteor.users.find({'profile.voteCount':{$gt:0}});
    var chartSize = 480;

    var chart = d3.select('svg.js-piechart')
    .attr('class', 'chart')
    .attr('width', chartSize)
    .attr('height', chartSize);

    var circleData = chart.selectAll('circle').data(users);

    var red = d3.rgb(255, 0, 0);
    var green = d3.rgb(0, 255, 0);

    circleData.enter().append('circle')
      .attr('r', function(user) { return 0; })
      .attr('fill', red)
      .attr('cy', 0)
      .attr('cx', function(d,i) { return 20 * (i+1); })

    circleData.transition().duration(2500)
      .delay(function(d,i) { return i * 1000; })
      .attr('r', function(user) { return 30; })
      .attr('fill', green)
      .attr('cy', 90)
      .attr('cx', function(d,i) { return 60 * (i+1); })
    // var chart_text = chart.selectAll('text').data(beers);


  };

  var initial = function() {};
  var update = function() {};

  return {
    initialRender: function() {
      render(initial);
    },

    updateRender: function() {
      render(update);
    }
  };
}();
