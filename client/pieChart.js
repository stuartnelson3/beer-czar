PieChart = function() {

  var render = function(updateFunction) {
    var users = Meteor.users.find().fetch();
    var totalUsers = users.count;

    console.log(pcStructure(mappedUsers(users)));

    var chartSize = 480;
    var r = 100;
    var p = Math.PI*r;
    var arc = d3.svg.arc()
                .innerRadius(function(d,i) {
                  return 0;
                }).outerRadius(function(d,i) {
                  return 85;
                });

    var indentReset;
    var totalUsers = 10;
    var offset = 0;

    var data = [ // mock out aggregated user data
      { voteCount: 3 }, { voteCount: 2 }, { voteCount: 4 }, { voteCount: 1 }
    ];

    createPieChart(data, arc, chartSize);

  };

  var createPieChart = function(data, arc, size) {
    var svg = d3.select('svg.js-piechart')
    .attr('width', size)
    .attr('height', size)
    .append('g')
    .attr('transform', 'translate(100,100)');

    var pie = d3.layout.pie()
        .value(function(d) { return d.voteCount; });

    var color = d3.scale.ordinal()
    .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

    var g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

      g.append('path')
      .attr('d', arc)
      .style('fill', function(d) { return color(d.data.voteCount); });

      g.append('text')
      .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text(function(d) { return d.data.voteCount; });
  };

  var pcStructure = function(users) {
    var structure = [];
    var zeroVote = {voteCount: 0, names: [], userCount: 0};
    var oneVote = {voteCount: 1, names: [], userCount: 0};
    var twoVote = {voteCount: 2, names: [], userCount: 0};
    var threeVote = {voteCount: 3, names: [], userCount: 0};

    structure.push(zeroVote);
    structure.push(oneVote);
    structure.push(twoVote);
    structure.push(threeVote);

    var hashMap = {
      0: zeroVote,
      1: oneVote,
      2: twoVote,
      3: threeVote
    }

    for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
      var voteBucket = hashMap[user.voteCount];
      if (voteBucket) {
        voteBucket.names.push(user.name);
        voteBucket.userCount += 1;
      }
    }

    return structure;
  };

  var mappedUsers = function(users) {
    return users.map(function(user) {
      return {voteCount: user.profile.voteCount, name: user.profile.name};
    });
  }

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
