(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$stateParams', 'Event'];
    function ListController($stateParams, Event) {
        var vm = this;

        vm.getEvents = getEvents;

        vm.getEvents();

        function getEvents() {
            Event.get(function(response) {
                vm.events = response.events;
            });
        }
    }
})();