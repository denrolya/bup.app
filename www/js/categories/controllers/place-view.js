(function () {
    'use strict';

    angular
        .module('app')
        .controller('PlaceViewController', PlaceViewController);

    PlaceViewController.$inject = ['$rootScope', '$scope', '$stateParams', '$cordovaGeolocation', 'Place'];
    function PlaceViewController($rootScope, $scope, $stateParams, $cordovaGeolocation, Place) {
        var vm = this;
        var distanceMatrixService = new google.maps.DistanceMatrixService();

        vm.categorySlug = $stateParams.categorySlug;
        vm.place = {};

        vm.getPlace = getPlace;
        vm.initializeMap = initializeMap;
        vm.sendGetPlaceRequest = sendGetPlaceRequest;

        var destroyEventListener;

        $scope.$on('$ionicView.enter', function() {
            destroyEventListener = $rootScope.$on('positionRefreshed', function(e, args) {
                vm.getPlace();
            });
        });

        $scope.$on('$ionicView.leave', function() {
            destroyEventListener();
        });

        vm.getPlace();

        function getPlace() {
            if (!ionic.Platform.is('browser')) {
                window.cordova.plugins.diagnostic.isLocationEnabled(function sc(enabled) {
                    var params = (!enabled)
                        ? {placeSlug: $stateParams.placeSlug}
                        : {
                        latitude: $rootScope.position.coords.latitude,
                        longitude: $rootScope.position.coords.longitude,
                        placeSlug: $stateParams.placeSlug
                    };

                    vm.sendGetPlaceRequest(params);
                });
            } else {
                vm.sendGetPlaceRequest({
                    latitude: $rootScope.position.coords.latitude,
                    longitude: $rootScope.position.coords.longitude,
                    placeSlug: $stateParams.placeSlug
                });
            }
        }

        function initializeMap(place) {
            var infowindow = new google.maps.InfoWindow(),
                mapElement = document.getElementById('map');

            var map = new google.maps.Map(mapElement, {
                center: place.location,
                disableDefaultUI: true,
                zoom: 17,
                styles: [{"featureType":"water","stylers":[{"color":"#19a0d8"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":6}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e85113"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-40}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-20}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"road.highway","elementType":"labels.icon"},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"lightness":20},{"color":"#efe9e4"}]},{"featureType":"landscape.man_made","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"hue":"#11ff00"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"hue":"#4cff00"},{"saturation":58}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#f0e4d3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-10}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"}]}]
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

        function sendGetPlaceRequest(params) {
            Place.get(params, function (response) {
                vm.place = response.place;
                vm.place.coverImage = vm.place.images[Math.floor(Math.random() * vm.place.images.length)]
                vm.place.location = new google.maps.LatLng(vm.place.latitude, vm.place.longitude);
                vm.initializeMap(vm.place);
                $scope.$broadcast('scroll.refreshComplete');
            }, function (error) {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    }
})();