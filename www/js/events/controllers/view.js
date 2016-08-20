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

        google.maps.event.addDomListener(window, 'load', function() {
            vm.initializeMap()
        });

        function getEvent() {
            Event.get({eventSlug: $stateParams.eventSlug}, function(response) {
                response.dateFrom = new Date(response.dateFrom);
                response.dateTo = new Date(response.dateTo);
                vm.event = response;
                vm.event.coverImage = vm.event.images[Math.floor(Math.random()*vm.event.images.length)]
            });
        }

        function initializeMap() {
            var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            navigator.geolocation.getCurrentPosition(function(pos) {
                map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                var myLocation = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                    map: map,
                    title: "My Location"
                });
            });

            $scope.map = map;
        }
    }
})();