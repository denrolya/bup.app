(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewController', ViewController);

    ViewController.$inject = ['$scope', '$stateParams', 'Place'];
    function ViewController($scope, $stateParams, Place) {
        var vm = this;

        vm.place = {};

        vm.getPlace = getPlace;
        vm.initializeMap = initializeMap;
        vm.getNumber = getNumber;

        vm.getPlace();

        google.maps.event.addDomListener(window, 'load', function() {
            vm.initializeMap()
        });

        function getPlace() {
            Place.get({placeSlug: $stateParams.placeSlug}, function(response) {
                vm.place = response.place;
                vm.place.coverImage = vm.place.images[Math.floor(Math.random()*vm.place.images.length)]
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

        function getNumber(num) {
            return new Array(num);
        }
    }
})();