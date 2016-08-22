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
                url: 'http://139.59.214.126/app_dev.php/api/events/grouped',
                isArray: false
            }
        });
    }
})();