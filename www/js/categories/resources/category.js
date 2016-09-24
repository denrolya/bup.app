(function() {
    'use strict';

    angular
        .module('app')
        .factory('Category', Category);

    Category.$inject = ['$resource', 'apiUrl'];
    function Category($resource, apiUrl) {
        return $resource(apiUrl + '/categories/:categorySlug', {categorySlug: '@categorySlug'}, {
            searchPlaces: {
                method: 'GET',
                ur: apiUrl + '/search/:searchQuery',
                params: {
                    searchQuery: '@searchQuery'
                }
            },
            getPlaces: {
                method: 'GET',
                url: apiUrl + '/categories/:categorySlug/places'
            },
            getDistanceToPlaces: {
                method: 'GET',
                url: apiUrl + '/distance'
            }
        });
    }
})();