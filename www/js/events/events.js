(function() {
    'use strict';

    // This file contains all the required configurations in this page-bundle
    angular
        .module('app')
        .config(function($stateProvider) {
            $stateProvider

                .state('app.events', {
                    url: '/events/:day/:month/:year',
                    views: {
                        'menuContent': {
                            templateUrl: 'js/events/templates/list.html',
                            controller: 'ListController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function($ocLazyLoad) {
                                    return $ocLazyLoad.load([{
                                        files: [
                                            'js/events/assets/css/style.css',
                                            'js/events/controllers/list.js',
                                            'js/events/controllers/view.js',
                                        ]
                                    }])
                                }
                            }
                        }
                    }
                })

                .state('app.events.view', {
                    url: '/:slug',
                    views: {
                        'menuContent@app': {
                            templateUrl: 'js/events/templates/view.html',
                            controller: 'ViewController',
                            controllerAs: 'vm'
                        }
                    }
                })
        });
})();