(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$stateParams'];
    function ListController($stateParams) {
        var vm = this;

        vm.date = new Date($stateParams.year + '/' + $stateParams.month  + '/' + $stateParams.day);

        vm.testEvents = [{
            name: 'Authentic Street Food',
            eventSlug: 'authentic-street-food',
            location: 'VI',
            coverImage: 'img/auth_street_food.jpg'
        }, {
            name: 'DJ Something',
            eventSlug: 'dj-something',
            location: 'XIII',
            coverImage: 'img/dj.jpg'
        }, {
            name: 'Museums',
            eventSlug: 'museums',
            location: 'VII',
            coverImage: 'img/museums.jpg'
        }, {
            name: "Rock'n'Roller",
            eventSlug: 'rock-n-roller',
            location: 'V',
            coverImage: 'img/rocknroller.jpg'
        }];
    }
})();