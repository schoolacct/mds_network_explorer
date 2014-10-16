/**
 * Created by nmew on 10/11/14.
 */
define(['backbone', 'd3'], function(Backbone, d3) {
    return Backbone.View.extend({

        initialize: function() {
            _.bindAll(this, 'initForce', 'tickFunc', 'zoomed');
            this.listenTo(this.model, 'change:nodes change:edges', _.debounce(this.initForce));
        },
        render: function() {
            var width = this.width = this.$el.width();
            var height = this.height = width; //this.$el.height();
            console.log('rendering networkView', width, height);
            // settup d3 svg
            var zoom = d3.behavior.zoom()
                .scaleExtent([1, 12])
                .on("zoom", this.zoomed);

            this.svg = d3.select(this.el).append("svg")
                .attr("width", width)
                .attr("height", height);

            this.container = this.svg.append("g")
                .attr("transform", "translate(" + width/2 + "," + height/2 + ")")
                .call(zoom);



            this.container.append("rect")
                .attr("x", -1 * width/2)
                .attr("y", -1 * width/2)
                .attr("width", width)
                .attr("height", height)
                .attr("opacity", 0);

            // settup force directed graph
            this.force = d3.layout.force().size([width/16, height/16]);
            // add nodes from model
            this.initForce();

            return this;
        },
        initForce: function() {
            console.log('initforce', this.model);
            var newNodes = this.model.get('nodes');
            var newEdges = this.model.get('edges');
            // run force
            this.force
                .nodes(newNodes)
                .links(newEdges)
                .start();

            // add links to svg
            this.links = this.container.selectAll(".link")
                .data(newEdges);
            this.links.enter().append("line")
                .attr("class", "link");
            this.links.exit().remove();

            // add nodes to svg
            this.nodes = this.container.selectAll(".node")
                .data(newNodes);
            this.nodes.enter().append("circle")
                .attr("class", "node")
                .attr("r", 2)
                .style("fill", "#ccc");
            this.nodes.exit().remove();

            // redraw
            this.tickFunc();
        },
        tickFunc: function() {
//                    console.log('tick', this, scope);
            this.links
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            this.nodes
                .attr("cx", function (d) {
                    if(d.x && !isNaN(d.x)) {
                        return d.x;
                    } else {
                        console.warn("d.x issue", d, this);
                        force.stop();
                    }
                })
                .attr("cy", function (d) {
                    if(d.y && !isNaN(d.y)) {
                        return d.y;
                    } else {
                        console.warn("d.y issue", d, this);
                        force.stop();
                    }
                });
        },
        zoomed: function() {
//            console.log( d3.event.translate);
            this.container.attr("transform", "translate(" + (d3.event.translate[0]+this.width/2) + "," + (d3.event.translate[1]+this.height/2) + ")scale(" + d3.event.scale + ")");
//            this.container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
    });
});