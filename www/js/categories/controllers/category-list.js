(function () {
    'use strict';

    angular
        .module('app')
        .controller('CategoryListController', CategoryListController);

    CategoryListController.$inject = ['$scope', 'Category'];
    function CategoryListController($scope, Category) {
        var vm = this;

        vm.categories = [];

        vm.getCategories = getCategories;

        vm.getCategories();

        function getCategories() {
            Category.get(function(response) {
                vm.categories = response.categories;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    }
})();