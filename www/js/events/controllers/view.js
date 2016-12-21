(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewController', ViewController);

    ViewController.$inject = ['$scope', '$stateParams', 'Event'];
    function ViewController($scope, $stateParams, Event) {
        var vm = this;

        vm.event = {};

        vm.getEvent = getEvent;
        vm.initializeMap = initializeMap;
        vm.sendGetEventRequest = sendGetEventRequest;

        vm.getEvent();

        function getEvent() {
            if (!ionic.Platform.is('browser')) {
                window.cordova.plugins.diagnostic.isLocationEnabled(function sc(enabled) {
                    var params = (!enabled)
                        ? {eventSlug: $stateParams.eventSlug}
                        : {
                        latitude: $scope.position.coords.latitude,
                        longitude: $scope.position.coords.longitude,
                        eventSlug: $stateParams.eventSlug
                    };

                    vm.sendGetEventRequest(params);
                });
            } else {
                vm.sendGetEventRequest({
                    latitude: $scope.position.coords.latitude,
                    longitude: $scope.position.coords.longitude,
                    eventSlug: $stateParams.eventSlug
                });
            }
        }

        function initializeMap(event) {
            var infowindow = new google.maps.InfoWindow(),
                mapElement = document.getElementById('map');

            var map = new google.maps.Map(mapElement, {
                center: event.location,
                disableDefaultUI: true,
                zoom: 17,
                styles: [{
                    featureType: 'all',
                    "stylers": [
                        { "invert_lightness": true },
                        { "gamma": 0.62 },
                        { "saturation": -9 },
                        { "lightness": 26 },
                        { "hue": "#00ffcc" }
                    ]
                }]
            });

            $scope.map = map;
            var marker = new google.maps.Marker({
                map: map,
                position: event.location
            });

            infowindow.setContent('<div><strong>' + event.title + '</strong><br>' + event.address);
            infowindow.open(map, marker);
            map.setCenter(marker.getPosition());
        }

        function sendGetEventRequest(params) {
            Event.get(params, function(response) {
                vm.event = response.event;
                vm.event.dateFrom = new Date(vm.event.dateFrom);
                vm.event.dateTo = new Date(vm.event.dateTo);
                vm.event.coverImage = vm.event.images[Math.floor(Math.random()*vm.event.images.length)]
                vm.event.location = new google.maps.LatLng(vm.event.latitude, vm.event.longitude);

                vm.initializeMap(vm.event);
                $scope.$broadcast('scroll.refreshComplete');
            }, function (error) {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    }
})();