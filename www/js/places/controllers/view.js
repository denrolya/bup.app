(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewController', ViewController);

    ViewController.$inject = ['$scope', '$stateParams', '$cordovaGeolocation', 'Place'];
    function ViewController($scope, $stateParams, $cordovaGeolocation, Place) {
        var vm = this;
        var distanceMatrixService = new google.maps.DistanceMatrixService();

        vm.categorySlug = $stateParams.categorySlug;
        vm.place = {};

        vm.getPlace = getPlace;
        vm.initializeMap = initializeMap;
        vm.getNumber = getNumber;

        vm.getPlace();

        function getPlace() {
            Place.get({placeSlug: $stateParams.placeSlug}, function(response) {
                vm.place = response.place;
                vm.place.coverImage = vm.place.images[Math.floor(Math.random()*vm.place.images.length)]
                vm.place.location = new google.maps.LatLng(vm.place.latitude, vm.place.longitude);
                vm.initializeMap(vm.place);

                if (navigator.geolocation) {
                    $cordovaGeolocation
                        .getCurrentPosition()
                        .then(function(position) {
                            var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                                placeLocation = new google.maps.LatLng(vm.place.latitude, vm.place.longitude);

                            distanceMatrixService.getDistanceMatrix({
                                origins: [currentLocation],
                                destinations: [placeLocation],
                                travelMode: 'WALKING',
                            }, function(response, status) {
                                vm.place.distance = response.rows[0].elements[0].distance.text;
                                $scope.$apply();
                            });
                        }, function() {
                            handleLocationError(true, infoWindow, map.getCenter());
                        });
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, map.getCenter());
                }
            });
        }

        function initializeMap(place) {
            var infowindow = new google.maps.InfoWindow(),
                mapElement = document.getElementById('map');

            var map = new google.maps.Map(mapElement, {
                center: place.location,
                disableDefaultUI: true,
                zoom: 17
            });

            $scope.map = map;
            var marker = new google.maps.Marker({
                map: map,
                position: place.location
            });

            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.address);
            infowindow.open(map, marker);
            map.setCenter(marker.getPosition());
        }

        function getNumber(num) {
            return new Array(num);
        }
    }
})();