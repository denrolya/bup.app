(function () {
    'use strict';

    angular
        .module('app')
        .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['$scope', '$rootScope', '$state', 'Event', '$timeout', 'lodash', '$ionicScrollDelegate'];
    function CalendarController($scope, $rootScope, $state, Event, $timeout, lodash, $ionicScrollDelegate) {
        var vm = this;

        vm.events = [];

        vm.showWeekdays = false;
        vm.datesDividers = [];
        vm.subheaderDate = '';

        vm.getEvents = getEvents;
        vm.onScroll = onScroll;
        vm.goToDate = goToDate;

        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) { fn(); }
            } else { this.$apply(fn); }
        };

        vm.getEvents();

        function getEvents() {
            var params = ($rootScope.position)
                ? {latitude: $rootScope.position.coords.latitude, longitude: $rootScope.position.coords.longitude}
                : {};

            Event.getGroupedFromToday(params, function(response) {
                vm.events = response.events;
                vm.subheaderDate = $rootScope.keys(vm.events)[0];

                $timeout(function() {
                    var dividers = document.getElementsByClassName('calendar-item-divider');
                    lodash.forEach(dividers, function(v, k) {
                        vm.datesDividers.push(v);
                    });
                });

                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function onScroll() {
            var top = $ionicScrollDelegate.$getByHandle('handler').getScrollPosition().top;

            displayWeekdays((top > 100) ? true : false);
            updateSubheaderDate(top);
            $scope.safeApply();
        }

        function goToDate(date) {
            var dateIndex = Object.keys(vm.events).indexOf(date),
                top = $ionicScrollDelegate.$getByHandle('handler').getScrollPosition().top;

            if (dateIndex !== 0) {
                $ionicScrollDelegate.$getByHandle('handler').scrollTo(0, vm.datesDividers[dateIndex].offsetTop + 60);
            } else {
                $ionicScrollDelegate.$getByHandle('handler').scrollTop();
            }
            updateSubheaderDate(top);
            $scope.safeApply();
        }

        function updateSubheaderDate(top) {
            var lastDate = lodash.findLast(vm.datesDividers, function(v, k) {
                return v.offsetTop <= top - 60;
            });

            var index = (lastDate) ? vm.datesDividers.indexOf(lastDate) : 0;
            vm.subheaderDate = $rootScope.keys(vm.events)[index];
        }

        function displayWeekdays(toShow) {
            vm.showWeekdays = (toShow) ? true : false;
            var contentBlock = angular.element(document.getElementsByClassName('has-subheader')[0]);

            if (toShow) {
                contentBlock.addClass('weekdays-show');
            } else {
                contentBlock.removeClass('weekdays-show');
            }
        }
    }
})();