(function() {
    'use strict';

    // This file contains all the required configurations in this page-bundle
    angular
        .module('app')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.index', {
                    url: '/index/:tabIndex',
                    views: {
                        'menuContent': {
                            templateUrl: 'js/index/templates/index.html',
                            controller: 'IndexController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function($ocLazyLoad) {
                                    return $ocLazyLoad.load([{
                                        files: [
                                            'js/events/assets/css/style.css',
                                            'js/categories/resources/category.js',
                                            'js/index/controllers/index.js'
                                        ]
                                    }])
                                }
                            }
                        }
                    }
                });
        });
})();