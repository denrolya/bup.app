(function() {
    'use strict';

    // This file contains all the required configurations in this page-bundle
    angular
        .module('app')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.event', {
                    url: '/events',
                    abstract: true,
                    resolve: {
                        loadPlugin: function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                files: [
                                    'js/events/assets/css/style.css',
                                    'js/events/resources/event.js',
                                    'js/events/controllers/calendar.js',
                                    'js/events/controllers/list.js',
                                    'js/events/controllers/view.js'
                                ]
                            }])
                        }
                    }
                })
                .state('app.event.calendar', {
                    url: '/calendar',
                    views: {
                        'menuContent@app': {
                            templateUrl: 'js/events/templates/calendar.html',
                            controller: 'CalendarController',
                            controllerAs: 'vm',
                        }
                    }
                })
                .state('app.event.event-list', {
                    url: '/:day/:month/:year',
                    views: {
                        'menuContent@app': {
                            templateUrl: 'js/events/templates/list.html',
                            controller: 'ListController',
                            controllerAs: 'vm',
                        }
                    }
                })
                .state('app.event.event-view', {
                    url: '/:eventSlug',
                    views: {
                        'menuContent@app': {
                            templateUrl: 'js/events/templates/view.html',
                            controller: 'ViewController',
                            controllerAs: 'vm',
                        }
                    }
                });
        });
})();