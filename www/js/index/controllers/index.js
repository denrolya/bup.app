(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$stateParams', 'Category'];
    function IndexController($stateParams, Category) {
        var vm = this;

        vm.currentActiveTab = Number($stateParams.tabIndex || 0);
        vm.dates = [], vm.categories = [];

        vm.getData = getData;
        vm.tabHasChanged = tabHasChanged;
        vm.getCategories = getCategories;

        vm.getData();

        function getData() {
            switch(vm.currentActiveTab) {
                case 0:
                    vm.getCategories();
                    break;
                case 1:
                    vm.dates = vm.dates.length == 0
                        ? [new Date('07.01.2016'), new Date('07.02.2016')]
                        : vm.dates;
                    break;
            }
        }

        function tabHasChanged(index) {
            vm.currentActiveTab = index;
            vm.getData();
        }

        function getCategories() {
            Category.get(function(response) {
                vm.categories = response.categories;
            });
        }
    }
})();