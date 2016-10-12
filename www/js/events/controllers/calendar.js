(function () {
    'use strict';

    angular
        .module('app')
        .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['$scope', '$rootScope', '$state', 'Event', 'lodash'];
    function CalendarController($scope, $rootScope, $state, Event, lodash) {
        var vm = this;

        vm.events = [];

        vm.getEvents = getEvents;

        vm.getEvents();

        function getEvents() {
            var params = ($rootScope.position)
                ? {latitude: $rootScope.position.coords.latitude, longitude: $rootScope.position.coords.longitude}
                : {};

            Event.getGroupedFromToday(params, function(response) {
                angular.forEach(response.events, function(v,k) {
                    var newkey = moment(k).format('dddd Do');
                    delete this[k];
                    this[newkey] = v;
                }, response.events);

                vm.events = response.events;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    }
})();