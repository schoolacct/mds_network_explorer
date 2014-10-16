/**
 * Created by nmew on 10/11/14.
 */
define([
    'backbone',
    'dataLoader',
    'models/networkModel',
    'views/DropDownView',
    'views/networkView',
//    'views/propertyPicker',
//    'dimensionPicker',
    'text!../../templates/mneView.html'], function(Backbone, dataLoader, NetworkModel, DropDownView, NetworkView, /*PropertyPicker, DimensionPicker,*/ template) {
    return Backbone.View.extend({
        initialize: function(options) {
            // create new model if neccessary
            if(!this.model) {
                this.model = new NetworkModel();
                dataLoader.init(this.model);
            }
            // load data
            dataLoader.setNetworkGraph(this.model);
        },
        render: function() {
            this.$el.append(template);
            // tools
//            this.propertyPicker = new PropertyPicker({
//                el: this.$('.propertyPicker'),
//                  collection: this.model.get('availableGraphProperties'),
//                model: this.model.get('property')
//            }).render();
//            this.dimensionPicker = new DimensionPicker({
//                el: this.$('.dimensionPicker'),
//                model: this.model.get('dimensions')
//            }).render();
            this.graphTypePicker = new DropDownView({
                el: this.$('.dimensionsPicker'),
                model: this.model,
                name: 'Dimensions',
                modelProperty: 'dimensions',
                collectionProperty: 'availableDimensions'
            }).render();
            this.graphTypePicker = new DropDownView({
                el: this.$('.alignmentAlgorithmPicker'),
                model: this.model,
                name: 'Protein Alignment Alg',
                modelProperty: 'alignmentAlgorithm',
                collectionProperty: 'availableAlignmentAlgorithms'
            }).render();
            this.graphTypePicker = new DropDownView({
                el: this.$('.graphTypePicker'),
                model: this.model,
                name: 'Graph Type',
                modelProperty: 'graphType',
                collectionProperty: 'availableGraphTypes'
            }).render();
            // network
            this.networkView = new NetworkView({
                el: this.$('.network'),
                model: this.model
            }).render();
            return this;
        }
    });
});