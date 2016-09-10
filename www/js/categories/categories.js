(function() {
    'use strict';

    // This file contains all the required configurations in this page-bundle
    angular
        .module('app')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.category', {
                    url: '/categories',
                    abstract: true,
                    resolve: {
                        loadPlugin: function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                files: [
                                    'js/categories/resources/category.js',
                                    'js/categories/resources/place.js',
                                    'js/categories/controllers/category-list.js',
                                    'js/categories/controllers/place-list.js',
                                    'js/categories/controllers/place-view.js'
                                ]
                            }])
                        }
                    }
                })
                .state('app.category.category-list', {
                    url: '/',
                    views: {
                        'menuContent@app': {
                            templateUrl: 'js/categories/templates/category-list.html',
                            controller: 'CategoryListController',
                            controllerAs: 'vm',
                        }
                    }
                })

                .state('app.category.place', {
                    url: '/categories/:categorySlug/places',
                    abstract: true
                })
                .state('app.category.place.place-list', {
                    url: '/',
                    views: {
                        'menuContent@app': {
                            templateUrl: 'js/categories/templates/place-list.html',
                            controller: 'PlaceListController',
                            controllerAs: 'vm',
                        }
                    }
                })
                .state('app.category.place.place-view', {
                    url: '/:placeSlug',
                    views: {
                        'menuContent@app': {
                            templateUrl: 'js/categories/templates/place-view.html',
                            controller: 'PlaceViewController',
                            controllerAs: 'vm',
                        }
                    }
                });
        });
})();