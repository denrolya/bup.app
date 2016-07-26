// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'oc.lazyLoad', 'ngLodash'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .filter('chunk', function(lodash) {
        return lodash.memoize(lodash.chunk);
    })

    .config(function ($urlMatcherFactoryProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $urlMatcherFactoryProvider.strictMode(false);

        $ionicConfigProvider.navBar.alignTitle('center');

        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

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
                                        'js/index/controllers/index.js'
                                    ]
                                }])
                            }
                        }
                    }
                }
            })

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

            .state('app.events.view', {
                url: '/:slug',
                views: {
                    'menuContent@app': {
                        templateUrl: 'js/events/templates/view.html',
                        controller: 'ViewController',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/app/index/');
    });
