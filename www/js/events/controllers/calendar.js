(function () {
    'use strict';

    angular
        .module('app')
        .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['$scope', 'Event'];
    function CalendarController($scope, Event) {
        var vm = this;

        vm.events = [];

        vm.getEvents = getEvents;

        vm.getEvents();

        function getEvents() {
            Event.getGroupedFromToday(function(response) {
                vm.events = response.events;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    }
})();