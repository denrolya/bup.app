(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', '$stateParams', '$document', 'Category', 'Event'];
    function IndexController($scope, $stateParams, $document, Category, Event) {
        var vm = this;

        vm.currentActiveTab = Number($stateParams.tabIndex || 0);
        vm.dates = [], vm.categories = [];

        vm.getData = getData;
        vm.tabHasChanged = tabHasChanged;
        vm.getCategories = getCategories;
        vm.getEvents = getEvents;

        vm.getData();

        $document.on('scroll', function() {
            console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop());
        });
        var container = angular.element(document.getElementsByClassName('cot')[0]);
        container.on('scroll', function() {
            console.log('Container scrolled to ', container.scrollLeft(), container.scrollTop());
        });

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
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function getCategories() {
            Category.get(function(response) {
                vm.categories = response.categories;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    }
})();