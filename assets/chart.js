// This is the D3 (Bostock) preferred way of creating re-usable
// charts.  More here: http://bost.ocks.org/mike/chart.
var chart = function(conf) {
    var container;

    var defaults = {
        height: 100,
        width: 100,
        padding: 1,
        data: [],
        container: "body"
    };

    conf = _(defaults).extend(conf);

    var c = function(data) {
        // Optional data param to change the underlying data set
        if (data) c.data(data);

        var max = d3.max(conf.data),
            dx = conf.width / conf.data.length;

        var yscale = d3.scale.linear()
                .domain([0, max]).range([0, conf.height]);
        var cscale = d3.scale.linear()
                .domain([0, conf.data.length]).range([0, 360]);

        var bars = container
            .selectAll("rect")
            .data(conf.data);

        // Add a rectangle and have it start
        // with a height from 0 so it can "grow"
        bars
            .enter().append("rect")
            .attr("y", conf.height + "px")
            .attr("height", "0px");

        // When we have too many rectangles,
        // use transition to "shrink" them to a
        // height of 0px. For simplicity, we
        // don't entirely ".remove()" them.
        bars
            .exit()
            .transition().duration(500)
            .attr("y", conf.height + "px")
            .attr("height", "0px");

        // Include transition() so that existing
        // bars can transition into their new size
        // over the course of 0.5 seconds
        bars
            .transition().duration(500)
            .attr("fill", function(d, i) {
                return d3.hsl(cscale(i), 0.50, 0.50);
            })
            .attr("height", function(d, i) {
                return yscale(d) + "px";
            })
            .attr("width", (dx - conf.padding) + "px")
            .attr("y", function(d, i) {
                return (conf.height - yscale(d)) + "px";
            })
            .attr("x", function(d, i) {
                return (dx * i + conf.padding/2) + "px";
            });

        return c;
    };

    c.data = function(data) {
        conf.data = data;
        return c;
    };

    // Initialize the container
    container = d3.select(conf.container)
        .attr("width", conf.width + "px")
        .attr("height", conf.height + "px");

    return c;
};