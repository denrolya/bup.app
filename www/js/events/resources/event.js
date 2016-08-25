(function() {
    'use strict';

    angular
        .module('app')
        .factory('Event', Event);

    Event.$inject = ['$resource', 'apiUrl'];
    function Event($resource, apiUrl) {
        return $resource(apiUrl + '/events/:eventSlug', {eventSlug: '@eventSlug'}, {
            getGroupedFromToday: {
                method: 'GET',
                url: apiUrl + '/events/grouped',
                isArray: false
            }
        });
    }
})();