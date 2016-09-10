(function () {
    'use strict';

    angular
        .module('app')
        .controller('CategoryListController', CategoryListController);

    CategoryListController.$inject = ['$scope', '$state', 'Category'];
    function CategoryListController($scope, $state, Category) {
        var vm = this;

        vm.categories = [];

        vm.getCategories = getCategories;
        vm.onSwipeLeft = function() {
            $state.go('app.event.calendar');
        }

        vm.getCategories();

        function getCategories() {
            Category.get(function(response) {
                vm.categories = response.categories;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    }
})();