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
                })
                .state('app.category.list', {
                    url: '/:categorySlug',
                    views: {
                        'menuContent@app': {
                            templateUrl: 'js/categories/templates/list.html',
                            controller: 'CategoryViewController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function($ocLazyLoad) {
                                    return $ocLazyLoad.load([{
                                        files: [
                                            'js/categories/assets/css/style.css',
                                            'js/categories/resources/category.js',
                                            'js/categories/controllers/category.view.js'
                                        ]
                                    }])
                                }
                            }
                        }
                    }
                })

                .state('app.category.view', {
                    url: '/:entrySlug',
                    views: {
                        'menuContent@app': {
                            templateUrl: 'js/categories/templates/view.html',
                            controller: 'EntryViewController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function($ocLazyLoad) {
                                    return $ocLazyLoad.load([{
                                        files: [
                                            'js/events/assets/css/style.css',
                                            'js/categories/resources/category.js',
                                            'js/categories/controllers/entry.view.js'
                                        ]
                                    }])
                                }
                            }
                        }
                    }
                })
        });
})();