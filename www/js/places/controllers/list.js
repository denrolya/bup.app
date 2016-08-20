(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$stateParams', 'Category'];
    function ListController($stateParams, Category) {
        var vm = this;

        vm.categorySlug = $stateParams.categorySlug;
        vm.places = [];

        vm.getPlaces = getPlaces;

        vm.getPlaces();

        function getPlaces() {
            Category.getPlaces({categorySlug: $stateParams.categorySlug}, function(response) {
                vm.places = response.places;
            });
        }
    }
})();