(function () {
    'use strict';

    angular
        .module('app')
        .controller('PlaceListController', PlaceListController);

    PlaceListController.$inject = ['$rootScope', '$scope', '$filter', '$ionicLoading', '$http', 'apiUrl', '$ionicPopup', '$stateParams', '$cordovaGeolocation', 'Category'];
    function PlaceListController($rootScope, $scope, $filter, $ionicLoading, $http, apiUrl, $ionicPopup, $stateParams, $cordovaGeolocation, Category) {
        var vm = this;
        var distanceMatrixService = new google.maps.DistanceMatrixService();

        vm.searchQuery = '';
        vm.category = $stateParams.category;
        vm.places = [];

        vm.getPlaces = getPlaces;
        vm.searchPlaces = searchPlaces;
        vm.updateDistances = updateDistances;

        vm.getPlaces();

        $scope.closeLoading = function() { $ionicLoading.hide() }

        var destroyEventListener;

        $scope.$on('$ionicView.enter', function() {
            destroyEventListener = $rootScope.$on('positionRefreshed', function(e, args) {
                if (vm.places.length === 0 || !vm.places[0].distance) {
                    console.log('no places or no distances to places. position was set. getting places...');
                    places(true);
                } else {
                    console.log('updating distance to places...');
                    vm.updateDistances();
                }
            });
        });

        $scope.$on('$ionicView.leave', function() {
            destroyEventListener();
        });

        $scope.cancel = $ionicLoading.hide();
        function getPlaces() {
            if (!ionic.Platform.is('browser')) {
                if ($rootScope.isPositionWatcherStarted && $rootScope.position) {
                    console.log('position is set. getting places...');
                    places(true);
                } else {
                    window.cordova.plugins.diagnostic.isLocationEnabled(function sc(enabled) {
                        if (!enabled) {
                            places(false);
                        } else {
                            $rootScope.startPositionWatcher();
                        }
                    });
                }
            } else {
                places(true);
            }
        }

        function places(sortByDistance) {
            if (sortByDistance) {
                var params = {
                    closest: true, categorySlug: vm.category.slug,
                    latitude: $rootScope.position.coords.latitude, longitude: $rootScope.position.coords.longitude
                };
                $ionicLoading.show({template: '<p ng-click="closeLoading()">Loading nearest places...</p>', scope: $scope });
                Category.getPlaces(params, function sc(response) {
                    if (response.places.length > 0) {
                        response.places.sort(function(a,b) {
                            return a.distanceValue > b.distanceValue
                        });
                        vm.places = response.places;
                        $scope.$broadcast('scroll.refreshComplete');
                        $ionicLoading.hide();
                    }
                });
            } else {
                $ionicLoading.show({template: '<p ng-click="closeLoading()">Loading nearest places...</p>', scope: $scope });
                Category.getPlaces({categorySlug: vm.category.slug}, function sc(response) {
                    response.places.sort(function(a,b) {
                        return a.distanceValue > b.distanceValue
                    });
                    vm.places = response.places;
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicLoading.hide();
                }, function ec(error) {
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicLoading.hide()
                });
            }
        }

        function searchPlaces() {
            $http.get(apiUrl + '/search/' + vm.searchQuery).then(function(response) {
                vm.places = response.data.places;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function updateDistances() {
            if (vm.places.length === 0) { return }

            var placesSlugs = [];

            vm.places.forEach(function(v, k) {
                placesSlugs.push(v.slug);
            });

            var params = {
                latitude: $rootScope.position.coords.latitude, longitude: $rootScope.position.coords.longitude,
                'placesSlugs[]': placesSlugs.reverse()
            }
            Category.getDistanceToPlaces(params, function sc(response) {
                response.data.forEach(function(v,k) {
                    var index = vm.places.indexOf($filter("filter")(vm.places, {slug: v.slug})[0]);
                    vm.places[index].distance = v.distance;
                    vm.places[index].distanceValue = v.distanceValue;
                    vm.places.sort(function(a,b) {
                        return a.distanceValue > b.distanceValue
                    });
                });
            });
        }
    }
})();