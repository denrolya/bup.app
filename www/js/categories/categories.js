(function() {
    'use strict';

    // This file contains all the required configurations in this page-bundle
    angular
        .module('app')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.category', {
                    url: '/category/:categorySlug',
                    views: {
                        'menuContent': {
                            templateUrl: 'js/categories/templates/category.view.html',
                            controller: 'CategoryViewController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function($ocLazyLoad) {
                                    return $ocLazyLoad.load([{
                                        files: [
                                            'js/categories/assets/css/style.css',
                                            'js/categories/controllers/category.view.js'
                                        ]
                                    }])
                                }
                            }
                        }
                    }
                })

                .state('app.category.entry', {
                    url: '/:entrySlug',
                    views: {
                        'menuContent@app': {
                            templateUrl: 'js/categories/templates/entry.view.html',
                            controller: 'EntryViewController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function($ocLazyLoad) {
                                    return $ocLazyLoad.load([{
                                        files: [
                                            'js/events/assets/css/style.css',
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