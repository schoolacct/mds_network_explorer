/**
 * Created by nmew on 10/11/14.
 */
define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var coordinatesUrl = _.template("../data/<%= dimensionsVisualized %>d_<%= alignmentAlgorithm %>_embedding.txt");
    var edgesUrl = _.template("../data/<%= alignmentAlgorithm %>/<%= dimensions %>d_graphs/<%= graphType %>_<%= dimensions %>d.csv");

    /**
     * Creates nodes from csv of coordinates
     * @param coordinatesText
     * @returns {Array}
     */
    var createNodesFromCoordinates = function(coordinatesText, dimensions) {
        var nodes = [];
        var coordinatesData = coordinatesText.split("\n");
        for(var i=0;i<coordinatesData.length; i++) {
            var coordinateData = coordinatesData[i].split(" ");
            // todo:replace 2 with dimensionsVisualized value
            if(coordinateData.length == 2) {
                var x = parseFloat(coordinateData[0]);
                var y = parseFloat(coordinateData[1]);
                var multiplier = 1.25;
                if(!isNaN(x) && !isNaN(y)) {
                    nodes.push({
                        x: multiplier * x,
                        y: multiplier * y,
                        fixed: true,
                        name: "tmpName"
                    });
                } else {
                    console.warn("error in data coordinatesData["+i+"]", coordinatesData[i]);
                }
            } else {
                console.warn("error in data coordinatesData[" + i + "]", coordinatesData[i]);
            }
        }
        return nodes;
    };

    /**
     * Creates edges from csv of node indexes
     * @param edgesText
     * @returns {Array}
     */
    var createEdges = function(edgesText) {
        var edges = [];
        var edgesData = edgesText.split("\n");
        for(var i=1;i<edgesData.length; i++) {
            var edgeData = edgesData[i].split(",");
            if(edgeData.length == 2 && !isNaN(edgeData[0]) && !isNaN(edgeData[1])) {          // todo:replace 2 with dimension value
                edges.push({
                    source: +edgeData[0],
                    target: +edgeData[1]
//                    ,weight: 1
                });
            } else {
                console.warn("error in data edgesData["+i+"]", edgesData[i]);
            }

        }
        return edges;
    };

    /**
     * Loads network graph based on the attributes of the graph model
     * @param graphModel an instance of GraphModel
     */
    var loadNetworkGraph = function(graphModel) {
        // load data

        return $.ajax( coordinatesUrl(graphModel.toJSON()) ).then(function(response){
//            console.log("coordinates", response);
            var nodes = createNodesFromCoordinates(response);
            return $.ajax( edgesUrl(graphModel.toJSON()) ).then(function(edgeResponse){
//                console.log("edges", edgeResponse);
                var edges = createEdges(edgeResponse);
                return {
                    nodes: nodes,
                    edges: edges
                };
            });
        });
    };

    var updateNetworkGraph = function(graphModel) {
        loadNetworkGraph(graphModel).then(function(graph) {
            graphModel.set('edges', graph.edges);
        });
    };

    var setNetworkGraph = function(graphModel) {
        loadNetworkGraph(graphModel).then(function(graph) {
            graphModel.set('nodes', graph.nodes);
            graphModel.set('edges', graph.edges);
        });
    };


    return _.extend({
        init: function(graphModel) {
            graphModel.on(/*this.listenTo(,*/
                'change:graphType change:alignmentAlgorithm change:dimensions change:property',
                function(){ setNetworkGraph(graphModel); });
        },
        setNetworkGraph: setNetworkGraph
    }, Backbone.Events);
});