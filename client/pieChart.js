PieChart = function() {

  var render = function(data) {
    var users = Meteor.users.find().fetch();
    var totalUsers = users.count;
    var chartSize = 480;
    var p = Math.PI*r;

    var data = pcStructure(mappedUsers(users));

    createPieChart(data, arc, chartSize);
  };

  var r = 100;

  var arc = d3.svg.arc()
    .innerRadius(function(d,i) {
      return r-80;
    }).outerRadius(function(d,i) {
      return r;
    });

  var update = function(oldPath) {
    // var value = this.value;
    // pie.value(function(d) { return d[value]; }); // change the value function
    newPath = oldPath.data(pie); // compute the new angles
    newPath.transition().duration(750).attrTween('d', arcTween); // redraw the arcs
  };

  // Store the displayed angles in _current.
  // Then, interpolate from _current to the new angles.
  // During the transition, _current is updated in-place by d3.interpolate.
  var arcTween = function(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    };
  }

  var svg = function(size) {
    return d3.select('svg.js-piechart')
      .attr('width', size)
      .attr('height', size)
      .append('g')
      .attr('transform', 'translate(100,100)');
  };

  var createPieChart = function(data, arc, size) {
    var pie = d3.layout.pie()
      .value(function(d) { return d.userCount; });

    var color = d3.scale.ordinal()
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

    var g = svg(size).selectAll('.arc')
      .data(pie(data)).enter().append('g')
      .attr('class', 'arc');

    var path = g.append('path')
      .attr('d', arc)
      .style('fill', function(d) { return color(d.data.voteCount); })
      .each(function(d) { this._current = d; }); // store angle for update

    g.append('text')
      .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text(function(d) { return 'Users with ' + d.data.voteCount + ' votes: ' + d.data.userCount; });
  };

  var pcStructure = function(users) {
    var zeroVote = {voteCount: 0, names: [], userCount: 0};
    var oneVote = {voteCount: 1, names: [], userCount: 0};
    var twoVote = {voteCount: 2, names: [], userCount: 0};
    var threeVote = {voteCount: 3, names: [], userCount: 0};

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

    var returnStruct = [];
    var temp = [zeroVote,oneVote,twoVote,threeVote];
    for (var i in temp) {
      if (temp[i].userCount)
        returnStruct.push(temp[i]);
    }

    return returnStruct;
  };

  var mappedUsers = function(users) {
    return users.map(function(user) {
      return {voteCount: user.profile.voteCount, name: user.profile.name};
    });
  }

  // var initial = function() {};
  // var update = function() {};

  return {
    initialRender: function(data) {
      render(data);
    },

    updateRender: function() {
      render(update);
    }
  };
}();
