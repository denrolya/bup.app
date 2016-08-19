(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$stateParams', 'Category', 'Event'];
    function IndexController($stateParams, Category, Event) {
        var vm = this;

        vm.currentActiveTab = Number($stateParams.tabIndex || 0);
        vm.dates = [], vm.categories = [];

        vm.getData = getData;
        vm.tabHasChanged = tabHasChanged;
        vm.getCategories = getCategories;
        vm.getEvents = getEvents;

        vm.getData();

        function getData() {
            switch(vm.currentActiveTab) {
                case 0:
                    vm.getCategories();
                    break;
                case 1:
                    vm.getEvents();
                    break;
            }
        }

        function tabHasChanged(index) {
            vm.currentActiveTab = index;
            vm.getData();
        }

        function getEvents() {
            Event.getGroupedFromToday(function(response) {
                vm.events = response.events;
            });
        }

        function getCategories() {
            Category.get(function(response) {
                vm.categories = response.categories;
            });
        }
    }
})();