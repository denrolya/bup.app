(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewController', ViewController);

    ViewController.$inject = ['$scope', '$ionicLoading', 'event'];
    function ViewController($scope, $ionicLoading, event) {
        var vm = this;

        vm.event = event;
        vm.event.dateFrom = new Date(vm.event.dateFrom);
        vm.event.dateTo = new Date(vm.event.dateTo);

        google.maps.event.addDomListener(window, 'load', function() {
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
        });
    }
})();