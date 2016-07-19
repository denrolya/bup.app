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
                coverImage: 'img/Pix/city-cars-traffic-lights-large.jpeg'
            }, {
                name: 'Film & Culture',
                coverImage: 'img/Pix/city-people-lights-village-large.jpg'
            }, {
                name: 'Health & Fitness',
                coverImage: 'img/Pix/city-traffic-vehicles-people-large.jpg'
            }, {
                name: 'Sports & Outdoors',
                coverImage: 'img/Pix/pexels-photo-45922-large.jpeg'
            }, {
                name: 'Nightclubs',
                coverImage: 'img/Pix/people-party-dancing-music-large.jpg'
            }, {
                name: 'Bars & Pubs',
                coverImage: 'img/Pix/pexels-photo-116025-large.jpeg'
            }, {
                name: 'Shopping',
                coverImage: 'img/Pix/SW_Dylan+Rives-large.jpg'
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