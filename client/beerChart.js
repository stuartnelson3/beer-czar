BeerChart = function() {

  var update = function(updateBarFunction) {
    var beers = Beer.find().fetch();
    var votes = Beer.find().map(function(b) {
      return b.votes;
    });

    var chart = d3.select('svg.js-barchart')
    .attr('class', 'js-barchart')
    .attr('width', 960)
    .attr('height', 20 * beers.length);

    var bar_data = chart.selectAll('rect').data(votes);
    var chart_text = chart.selectAll('text').data(beers);

    transitionBarData(bar_data, xScale(votes));
    updateBarFunction(bar_data, xScale(votes));
    transitionText(chart_text, xScale(votes));
  };

  var transitionBarData = function(barData, xScale) {
    barData.enter().append('rect')
    .attr('width', function() { return 0; })
    .attr('y', function(d,i) { return i * 20; })
    .attr('height', 20);
  };

  var initialShow = function(barData, xScale) {
    barData.transition().duration(750)
    .delay(function(d,i) { return i*250; })
    .attr('width', xScale);
  };

  var updateShow = function(barData, xScale) {
    barData.transition().duration(750)
    .attr('width', xScale);
  };

  var transitionText = function(chartText, xScale) {
    chartText
    .enter().append('text')
    .attr('x', function(d,i) { return 0; })
    .attr('y', function(d,i) { return i*20+10; })
    .attr('dx', -3) // padding-right
    .attr('dy', '.35em') // vertical-align: middle
    .attr('text-anchor', 'end') // text-align: right
    .text(function(d) { return d.name + ': ' + d.votes + ' votes'; });

    chartText.transition().duration(750)
    .attr('x', function(d) {return xScale(d.votes);})
    .text(function(d) { return d.name + ': ' + d.votes + ' votes'; });
  };

  var xScale = function(domain) {
    return function(d) { return d*50; }
    // return  d3.scale.linear()
    //           .domain([0, d3.max(domain)])
    //           .range([0, 480]);
  };

  return {
    initialShow: function() {
      update(initialShow);
    },

    updateShow: function() {
      update(updateShow);
    }
  };

}();


