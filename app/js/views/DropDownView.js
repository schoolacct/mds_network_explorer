/**
 * Created by nmew on 10/15/14.
 */
define(['backbone', 'text!../../templates/dropdownView.html'], function(Backbone, template) {
    return Backbone.View.extend({
        events: {
            'click a': 'select'
        },
        initialize: function(options) {
            this.collectionProperty = options.collectionProperty;
            this.modelProperty = options.modelProperty;
            this.initializedTemplate = _.template(template)({buttonText: options.name});
            this.model.on('change:graphType', function(){console.log('changegraphtype',arguments);});
        },
        render: function() {
            console.log(this);
            this.el.innerHTML = this.initializedTemplate;
            _.each(this.model.get(this.collectionProperty), function(option, index){
                this.$('ul').append('<li><a href="#" data-index="'+index+'">'+option+'</a></li>');
            }, this);
            return this;
        },
        select: function(e) {
            console.log(e.currentTarget);
            var selection = this.model.get(this.collectionProperty)[$(e.currentTarget).data('index')];
            this.model.set(this.modelProperty, selection);
            console.log('selected', selection, this.model);

        }
    });
});