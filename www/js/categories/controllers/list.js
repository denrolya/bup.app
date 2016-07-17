(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = [];
    function ListController() {
        var vm = this;

        vm.testCategories = [{
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
        }];
    }
})();