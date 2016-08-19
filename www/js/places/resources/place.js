(function() {
    'use strict';

    angular
        .module('app')
        .factory('Place', Place);

    Place.$inject = ['$resource'];
    function Place($resource) {
        return $resource('http://bud.api/app_dev.php/api/categories/:categorySlug/places/:placeSlug', {
            categorySlug: '@categorySlug',
            placeSlug: '@placeSlug'
        }, {});
    }
})();