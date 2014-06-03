requirejs.config({
    baseUrl: 'js',

    paths: {
        jquery: 'jquery',
        backbone: 'Backbone',
        underscore: 'underscore'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'jquery.tooltip': ['jquery']
    }
});


require(['app/View', 'jquery.tooltip'], function(AppView) {
    window.app = new AppView();
    $.tooltip('[title]');
});