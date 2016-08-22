(function() {
    'use strict';

    angular
        .module('app')
        .factory('Place', Place);

    Place.$inject = ['$resource', 'apiUrl'];
    function Place($resource, apiUrl) {
        return $resource(apiUrl + '/places/:placeSlug', {placeSlug: '@placeSlug'}, {});
    }
})();