(function() {
    'use strict';

    angular
        .module('app')
        .factory('Event', Event);

    Event.$inject = ['$resource'];
    function Event($resource) {
        return $resource('http://bud.api/app_dev.php/api/events/:eventSlug', {eventSlug: '@eventSlug'}, {
            getGroupedFromToday: {
                method: 'GET',
                url: 'http://bud.api/app_dev.php/api/events/grouped',
                isArray: false
            }
        });
    }
})();