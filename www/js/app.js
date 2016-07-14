// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers'])

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

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.navBar.alignTitle('center');

        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.categories', {
                url: '/categories',
                views: {
                    'menuContent': {
                        templateUrl: 'js/categories/templates/list.html',
                        controller: 'ListController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('app.calendar', {
                url: '/calendar',
                views: {
                    'menuContent': {
                        templateUrl: 'js/calendar/templates/calendar.html',
                        controller: 'CalendarController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('app.events', {
                url: '/events/:day/:month/:year',
                views: {
                    'menuContent': {
                        templateUrl: 'js/events/templates/list.html',
                        controller: 'ListController',
                        controllerAs: 'vm'
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
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/categories');
    });
