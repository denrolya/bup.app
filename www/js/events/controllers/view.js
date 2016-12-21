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

        vm.getEvent();

        function getEvent() {
            Event.get({eventSlug: $stateParams.eventSlug}, function(response) {
                vm.event = response.event;
                vm.event.dateFrom = new Date(vm.event.dateFrom);
                vm.event.dateTo = new Date(vm.event.dateTo);
                vm.event.coverImage = vm.event.images[Math.floor(Math.random()*vm.event.images.length)]
                vm.event.location = new google.maps.LatLng(vm.event.latitude, vm.event.longitude);

                vm.initializeMap(vm.event);
            });
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

        //function initializeMap() {
        //    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
        //
        //    var mapOptions = {
        //        center: myLatlng,
        //        zoom: 16,
        //        zoomControl: true,
        //        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        //        mapTypeIds: ['roadmap', 'terrain'],
        //        mapTypeControl: true,
        //        mapTypeId: google.maps.MapTypeId.ROADMAP,
        //        styles: [{
        //            featureType: 'all',
        //            "stylers": [
        //                { "invert_lightness": true },
        //                { "gamma": 0.62 },
        //                { "saturation": -9 },
        //                { "lightness": 26 },
        //                { "hue": "#00ffcc" }
        //            ]
        //        }]
        //    };
        //
        //    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //
        //    navigator.geolocation.getCurrentPosition(function(pos) {
        //        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        //
        //        var myLocation = new google.maps.Marker({
        //            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        //            map: map,
        //            title: "My Location"
        //        });
        //    });
        //
        //    $scope.map = map;
        //}
    }
})();