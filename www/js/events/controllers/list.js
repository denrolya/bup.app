(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = [];
    function ListController() {
        var vm = this;

        vm.testEvents = [{
            name: 'Authentic Street Food',
            location: 'VI',
            coverImage: 'img/auth_street_food.jpg'
        }, {
            name: 'DJ Something',
            location: 'XIII',
            coverImage: 'img/dj.jpg'
        }, {
            name: 'Museums',
            location: 'VII',
            coverImage: 'img/museums.jpg'
        }, {
            name: "Rock'n'Roller",
            location: 'V',
            coverImage: 'img/rocknroller.jpg'
        }];
    }
})();