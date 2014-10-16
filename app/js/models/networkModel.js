/**
 * Created by nmew on 10/12/14.
 */
define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            availableDimensionVisualized: [2],
            availableDimensions: _.range(2,12),
            availableAlignmentAlgorithms: ['dali', 'fatcat'],
            availableGraphTypes: ['1nn','2nn','3nn','4nn','gg','rng'],
            availableGraphProperties: ['degree','closeness','betweenness'],
            dimensionsVisualized: 2,
            dimensions: 3,
            alignmentAlgorithm: 'dali',
            graphType: 'gg',
            property: 'betweenness',
            nodes: [],
            edges: []
        }
    });
});