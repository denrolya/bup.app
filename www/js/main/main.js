// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['app.constants', 'ionic', 'ngCordova', 'app.controllers', 'ngResource', 'oc.lazyLoad', 'ngLodash', 'duScroll'])

    .run(function ($ionicPlatform, $rootScope, $cordovaGeolocation, $ionicPopup, $interval, positionRefreshInterval) {
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

            var rs = $rootScope;

            rs.positionRefreshInterval = positionRefreshInterval;
            rs.isPositionWatcherStarted = false;

            rs.checkLocation = checkLocation;
            rs.startPositionWatcher = startPositionWatcher;
            rs.askLocationAndStartWatcher = askLocationAndStartWatcher;
            rs.getPositionInBrowser = getPositionInBrowser;
            rs.getPositionOnDevice = getPositionOnDevice;

            rs.checkLocation();

            function checkLocation() {
                if (!ionic.Platform.is('browser')) {
                    window.cordova.plugins.diagnostic.isLocationEnabled(function sc(enabled) {
                        if (!enabled) { rs.askLocationAndStartWatcher() }
                        else { rs.startPositionWatcher() }
                    }, function ec(error) {});
                } else { rs.startPositionWatcher() }
            }

            function startPositionWatcher() {
                console.log('startWatcher begin');
                if (!ionic.Platform.is('browser')) {
                    rs.getPositionOnDevice();
                    rs.isPositionWatcherStarted = true;
                    $interval(rs.getPositionOnDevice, rs.positionRefreshInterval);
                } else {
                    rs.getPositionInBrowser();
                    rs.isPositionWatcherStarted = true;
                    $interval(rs.getPositionInBrowser, rs.positionRefreshInterval);
                }
            }

            function askLocationAndStartWatcher() {
                window.cordova.plugins.locationAccuracy.canRequest(function(canRequest) {
                    if(canRequest) {
                        window.cordova.plugins.locationAccuracy.request(function(success) { console.log('start watcher from askLocation'); rs.startPositionWatcher();  }, function(error) {
                            if(error.code !== window.cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                                if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                                    window.cordova.plugins.diagnostic.switchToLocationSettings();
                                }
                            }
                        }, window.cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
                    }
                });
            }

            function getPositionOnDevice() {
                var options = {
                    timeout: rs.positionRefreshInterval,
                    maxAge: 0,
                    enableHighAccuracy: true
                };

                $cordovaGeolocation.getCurrentPosition(options)
                    .then(function (position) {
                        rs.position = position;
                        console.log('position refreshed');
                    },
                    function (err) { console.log('error happened in startWatcher')});
            }

            function getPositionInBrowser() {
                navigator.geolocation.getCurrentPosition(function(position) {
                    rs.position = position
                    console.log('position refreshsed');
                }, function ec(error) {}, { enableHighAccuracy: true });
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
                templateUrl: 'js/main/templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent@app': {
                        templateUrl: 'js/main/templates/settings.html',
                        controller: 'SettingsController',
                        controllerAs: 'vm',
                        resolve: {
                            loadPlugin: function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    files: [
                                        'js/main/controllers/settings.js'
                                    ]
                                }])
                            }
                        }
                    }
                }
            });

        $urlRouterProvider.otherwise('/app/categories/');
    });
