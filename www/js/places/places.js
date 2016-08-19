(function() {
    'use strict';

    // This file contains all the required configurations in this page-bundle
    angular
        .module('app')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.places', {
                    url: '/categories',
                    abstract: true,
                    resolve: {
                        loadPlugin: function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                files: [
                                    'js/places/assets/css/style.css',
                                    'js/places/resources/place.js',
                                    'js/places/controllers/list.js',
                                    'js/places/controllers/view.js'
                                ]
                            }])
                        }
                    }
                })
                .state('app.places.list', {
                    url: '/:categorySlug',
                    views: {
                        'menuContent@app': {
                            templateUrl: 'js/places/templates/list.html',
                            controller: 'ListController',
                            controllerAs: 'vm',
                        }
                    }
                })

                .state('app.places.view', {
                    url: '/:categorySlug/places/:placeSlug',
                    views: {
                        'menuContent@app': {
                            templateUrl: 'js/places/templates/view.html',
                            controller: 'ViewController',
                            controllerAs: 'vm',
                        }
                    }
                })
        });
})();