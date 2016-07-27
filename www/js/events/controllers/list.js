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
            slug: 'authentic-street-food',
            distance: '2.3',
            shortDescription: 'Taste the most hungarian dishes in the open air food festival right in the heart of the city.',
            coverImage: 'img/pexels-photo-87216-large.jpeg'
        }, {
            name: 'DJ Something',
            slug: 'dj-something',
            distance: '2.4',
            shortDescription: 'Feel the rhythm, of that psycho.',
            coverImage: 'img/city-people-lights-village-large.jpg'
        }, {
            name: 'Sziget Fesztival 2016',
            slug: 'sziget-fesztival-2016',
            distance: '2.7',
            shortDescription: "Festival that doesn't need no advertisment. Simply go there and have fun!",
            coverImage: 'img/pexels-photo-116025-large.jpeg'
        }, {
            name: "Rock'n'Roller",
            slug: 'rock-n-roller',
            distance: '3.8',
            shortDescription: "Watch Guy Ritchie's masterpiece on the open-air rooftop cinema.",
            coverImage: 'img/people-party-dancing-music-large.jpg'
        }];
    }
})();