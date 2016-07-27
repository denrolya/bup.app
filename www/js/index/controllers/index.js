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
                name: 'Cafes',
                slug: 'cafes',
                coverImage: 'img/city-cars-traffic-lights-large.jpeg'
            }, {
                name: 'Film & Culture',
                slug: 'culture',
                coverImage: 'img/city-people-lights-village-large.jpg'
            }, {
                name: 'Health & Fitness',
                slug: 'fitness',
                coverImage: 'img/city-traffic-vehicles-people-large.jpg'
            },{
                name: 'Nightclubs',
                slug: 'nightclubs',
                coverImage: 'img/people-party-dancing-music-large.jpg'
            }, {
                name: 'Bars & Pubs',
                slug: 'pubs',
                coverImage: 'img/pexels-photo-116025-large.jpeg'
            }, {
                name: 'Shopping',
                slug: 'shopping',
                coverImage: 'img/SW_Dylan+Rives-large.jpg'
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