(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', '$ionicLoading', '$ionicPopup', '$stateParams', '$cordovaGeolocation', 'Category'];
    function ListController($scope, $ionicLoading, $ionicPopup, $stateParams, $cordovaGeolocation, Category) {
        var vm = this;
        var distanceMatrixService = new google.maps.DistanceMatrixService();

        vm.categorySlug = $stateParams.categorySlug;
        vm.places = [];

        vm.getPlaces = getPlaces;

        vm.getPlaces();

        $scope.$on('distanceCalculated', function(e, args) {
            vm.places = args;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        });

        function getPlaces() {
            $ionicLoading.show({template: 'Loading nearest places...'});

            if (!ionic.Platform.is('browser')) {
                window.cordova.plugins.diagnostic.isLocationEnabled(function sc(enabled) {
                        if (enabled) { places(true) }
                        else {
                            $ionicLoading.hide();

                            var confirmPopup = $ionicPopup.confirm({
                                title: 'Please turn location settings on.',
                                template: 'By turning location service on your device on - you maximize pleasure of using it!'
                            });

                            confirmPopup.then(function(res) {
                                if(res) {
                                    cordova.plugins.diagnostic.switchToLocationSettings();
                                } else {
                                    places(false)
                                }
                            });
                        }
                    }, function ec(error) {
                        $ionicPopup.alert({
                            title: 'Error!',
                            template: 'Error happened while checking location service'
                        });
                    });
            } else {
                places();
            }
        }

        function places(sortByDistance) {
            if (sortByDistance) {
                $cordovaGeolocation
                    .getCurrentPosition()
                    .then(function sc(position) {
                        var params = {
                            closest: true,
                            categorySlug: $stateParams.categorySlug,
                            latitude: position.coords.latitude, longitude: position.coords.longitude
                        };

                        Category.getPlaces(params, function sc(response) {
                            if (response.places.length > 0) {
                                calculateDistancesToPlaces(position, response.places);
                            }
                        }, function ec(error) { $ionicLoading.hide() });

                    }, function ec(error) { $ionicLoading.hide() });
            } else {
                Category.getPlaces({categorySlug: $stateParams.categorySlug}, function sc(response) {
                    $scope.$broadcast('distanceCalculated', response.places);
                }, function ec(error) { $ionicLoading.hide() });
            }
        }

        function calculateDistancesToPlaces(position, places) {
            var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                destinations = [];

            places.forEach(function (place, key) {
                destinations.push(new google.maps.LatLng(place.latitude, place.longitude));
            });

            distanceMatrixService.getDistanceMatrix({
                origins: [currentLocation],
                destinations: destinations,
                travelMode: 'WALKING',
            }, function (response, status) {
                response.rows[0].elements.forEach(function(value, key) {
                    places[key].distance = value.distance.text;
                    places[key].distanceValue = value.distance.value;
                });
                places.sort(function(a,b) {
                    return a.distanceValue > b.distanceValue;
                });

                $scope.$broadcast('distanceCalculated', places);
            });
        }
    }
})();