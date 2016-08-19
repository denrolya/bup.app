(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$stateParams', 'Place'];
    function ListController($stateParams, Place) {
        var vm = this;

        vm.categorySlug = $stateParams.categorySlug;
        vm.places = [];

        vm.getPlaces = getPlaces;

        vm.getPlaces();

        function getPlaces() {
            Place.get({categorySlug: $stateParams.categorySlug}, function(response) {
                vm.places = response.places;
            });
        }
    }
})();