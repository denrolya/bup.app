(function() {
    'use strict';

    angular
        .module('app')
        .factory('Category', Category);

    Category.$inject = ['$resource'];
    function Category($resource) {
        return $resource('http://bud.api/app_dev.php/api/secure/categories/:categorySlug', {categorySlug: '@categorySlug'}, {
            getPlaces: {
                method: 'GET',
                url: 'http://bud.api/app_dev.php/api/categories/:categorySlug/places'
            }
        });
    }
})();