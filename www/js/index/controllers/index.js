(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$stateParams', '$state'];
    function IndexController($stateParams, $state) {
        var vm = this;

        vm.currentActiveTab = Number($stateParams.tabIndex || 1);
        vm.testDates = [],
        vm.testCategories = [];

        vm.getData = getData;
        vm.tabHasChanged = tabHasChanged;
        vm.getCategories = getCategories;
        vm.getDates = getDates;

        vm.getData();

        function getData() {
            switch(vm.currentActiveTab) {
                case 0:
                    break;
                case 1:
                    vm.testCategories = vm.getCategories();
                    break;
                case 2:
                    vm.testDates = vm.getDates();
                    break;
            }
        }

        function tabHasChanged(index) {
            vm.currentActiveTab = index;
            vm.getData();
        }

        function getCategories() {
            return vm.testCategories.length == 0
                    ? [{
                name: 'Shopping',
                coverImage: 'img/shopping.jpg'
            }, {
                name: 'Festivals & Exhibitions',
                coverImage: 'img/festival.jpg'
            }, {
                name: 'Restaurants & Cafes',
                coverImage: 'img/cafe.jpg'
            }, {
                name: 'Sports & Outdoors',
                coverImage: 'img/sport.jpg'
            }, {
                name: 'We Recommend',
                coverImage: 'img/we_recommend.jpg'
            }, {
                name: 'Nightlife',
                coverImage: 'img/nightlife.jpg'
            }, {
                name: 'Shopping',
                coverImage: 'img/shopping.jpg'
            }, {
                name: 'Festivals & Exhibitions',
                coverImage: 'img/festival.jpg'
            }, {
                name: 'Restaurants & Cafes',
                coverImage: 'img/cafe.jpg'
            }, {
                name: 'Sports & Outdoors',
                coverImage: 'img/sport.jpg'
            }, {
                name: 'We Recommend',
                coverImage: 'img/we_recommend.jpg'
            }, {
                name: 'Nightlife',
                coverImage: 'img/nightlife.jpg'
            }]
                : vm.testCategories;
        }

        function getDates() {
            return vm.testDates.length == 0
                ? [new Date('07.01.2016'), new Date('07.02.2016')]
                : vm.testDates;
        }
    }
})();