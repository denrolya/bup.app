(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = [];
    function ListController() {
        var vm = this;

        vm.testCategories = [
            { name: 'Shopping' },
            { name: 'Festivals & Exhibitions' },
            { name: 'Restaurants & Cafes' },
            { name: 'Sports & Outdoors' },
            { name: 'We Recommend' },
            { name: 'Nightlife' }
        ]
    }
})();