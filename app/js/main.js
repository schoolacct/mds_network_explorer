require.config({
    paths: {
        "text": "libs/requirejs-text/text",
        "jquery": "libs/jquery/dist/jquery",
        "underscore": "libs/underscore/underscore-min",
        "backbone": "libs/backbone/backbone",
        "d3": "libs/d3/d3.min",
        "bootstrap": "libs/bootstrap/dist/js/bootstrap.min"
    },
    shim: {
        "bootstrap": {
            deps: ['jquery']
        }
    }
});
//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
require(['views/mneView','bootstrap'], function(MneView) {
//    console.log('hi');
    new MneView({
        el: 'body'
    }).render();

});