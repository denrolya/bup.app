(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', '$ionicLoading', '$stateParams', '$cordovaGeolocation', 'Category'];
    function ListController($scope, $ionicLoading, $stateParams, $cordovaGeolocation, Category) {
        var vm = this;
        var distanceMatrixService = new google.maps.DistanceMatrixService();

        vm.categorySlug = $stateParams.categorySlug;
        vm.places = [];

        vm.getPlaces = getPlaces;

        vm.getPlaces();

        $scope.$on('distanceCalculated', function(e, args) {
            vm.places = args;
        });

        function getPlaces() {
            $ionicLoading.show({template: 'Loading nearest places...'});

            if (navigator.geolocation) {
                $cordovaGeolocation
                    .getCurrentPosition()
                    .then(function (position) {
                        var params = {
                            categorySlug: $stateParams.categorySlug,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        };

                        Category.getPlaces(params, function (response) {
                            if (response.places.length > 0) {
                                calculateDistancesToPlaces(position, response.places);
                            }
                            $scope.$broadcast('scroll.refreshComplete');
                            $ionicLoading.hide();
                        }, function(error) {
                            $ionicLoading.hide();
                        });
                    }, function(error) {
                        $ionicLoading.hide();
                    });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
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

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        }
    }
})();