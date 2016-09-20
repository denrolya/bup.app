// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['app-constants', 'ionic', 'ngCordova', 'app.controllers', 'ngResource', 'oc.lazyLoad', 'ngLodash', 'duScroll'])

    .run(function ($ionicPlatform, $rootScope, $ionicHistory) {
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

            $rootScope.showSearch = false;

            // Close search on page change
            $rootScope.$on("$locationChangeStart", function(event) {
                $rootScope.showSearch = false;
            });
            $rootScope.toggleSearch = function() {
                $rootScope.showSearch = !$rootScope.showSearch;
            }

            $rootScope.hasBackView = function() {
                return $ionicHistory.backView() !== null;
            }

            $rootScope.goBack = function () {
                $ionicHistory.goBack();
            };

            $rootScope.goToLink = function(link) {
                window.open(link, '_system', 'location=yes');
                return false;
            }

            $rootScope.getNumber = function(num) {
                return new Array(num);
            }
        });
    })

    .filter('chunk', function(lodash) {
        return lodash.memoize(lodash.chunk);
    })
    .filter('if', function () {
        return function(input, trueValue, falseValue) {
            return input ? trueValue : falseValue;
        };
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
            });

        $urlRouterProvider.otherwise('/app/categories/');
    });
