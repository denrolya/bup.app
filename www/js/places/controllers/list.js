(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', '$stateParams', '$cordovaGeolocation', 'Category'];
    function ListController($scope, $stateParams, $cordovaGeolocation, Category) {
        var vm = this;
        var distanceMatrixService = new google.maps.DistanceMatrixService();

        vm.categorySlug = $stateParams.categorySlug;
        vm.places = [];

        vm.getPlaces = getPlaces;

        vm.getPlaces();

        function getPlaces() {
            Category.getPlaces({categorySlug: $stateParams.categorySlug}, function(response) {
                vm.places = response.places;
                vm.places.forEach(function(place,key) {
                    if (navigator.geolocation) {
                        $cordovaGeolocation
                            .getCurrentPosition()
                            .then(function(position) {
                                var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                                    placeLocation = new google.maps.LatLng(place.latitude, place.longitude);

                                distanceMatrixService.getDistanceMatrix({
                                    origins: [currentLocation],
                                    destinations: [placeLocation],
                                    travelMode: 'WALKING',
                                }, function(response, status) {
                                    vm.places[key].distance = response.rows[0].elements[0].distance.text;
                                    $scope.$apply();
                                });
                            });
                    } else {
                        // Browser doesn't support Geolocation
                        handleLocationError(false, infoWindow, map.getCenter());
                    }
                });
                $scope.$broadcast('scroll.refreshComplete');
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