// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['app-constants', 'ionic', 'ngCordova', 'app.controllers', 'ngResource', 'oc.lazyLoad', 'ngLodash', 'duScroll'])

    .run(function ($ionicPlatform, $rootScope, $cordovaGeolocation, $ionicPopup, $interval) {
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

            $rootScope.position;
            $rootScope.$watch('position', function(nv, ov) {
                $rootScope.$broadcast('positionUpdated', nv);
            });

            checkLocation();

            function checkLocation() {
                if (!ionic.Platform.is('browser')) {
                    window.cordova.plugins.diagnostic.isLocationEnabled(function sc(enabled) {
                        if (!enabled) {
                            askLocationAndStartWatcher();
                        } else {
                            startWatcher();
                        }
                    }, function ec(error) {});
                } else {
                    startWatcher();
                }
            }

            function startWatcher() {
                console.log('startWatcher() begin');
                if (!ionic.Platform.is('browser')) {
                    var watch = $cordovaGeolocation.watchPosition({timeout: 3000, enableHighAccuracy: true});
                    watch.then(null,
                        function (err) {
                            console.log('error happened in startWatcher()');
                        },
                        function (position) {
                            $rootScope.position = position;
                            console.log('position updated');
                        });
                } else {
                    $interval(function() {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            $rootScope.position = position
                            console.log('position updated');
                        }, function ec(error) {}, {enableHighAccuracy: true});
                    }, 3000)
                }
            }

            function askLocationAndStartWatcher() {
                window.cordova.plugins.locationAccuracy.canRequest(function(canRequest) {
                    if(canRequest) {
                        window.cordova.plugins.locationAccuracy.request(function(success) { console.log('start watcher from askLocation'); startWatcher();  }, function(error) {
                            //if(error.code !== window.cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                            //    if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                            //        window.cordova.plugins.diagnostic.switchToLocationSettings();
                            //    }
                            //}
                        }, window.cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
                    }
                });
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
