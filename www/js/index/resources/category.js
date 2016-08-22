(function() {
    'use strict';

    angular
        .module('app')
        .factory('Category', Category);

    Category.$inject = ['$resource', 'apiUrl'];
    function Category($resource, apiUrl) {
        return $resource(apiUrl + '/categories/:categorySlug', {categorySlug: '@categorySlug'}, {
            getPlaces: {
                method: 'GET',
                url: apiUrl+ '/categories/:categorySlug/places'
            }
        });
    }
})();