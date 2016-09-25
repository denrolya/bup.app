(function () {
    'use strict';

    angular
        .module('app')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$rootScope'];
    function SettingsController($rootScope) {
        var vm = this;

        vm.positionRefreshInterval = $rootScope.positionRefreshInterval;

        vm.updatePositionRefreshInterval = updatePositionRefreshInterval;

        function updatePositionRefreshInterval() {
            $rootScope.positionRefreshInterval = vm.positionRefreshInterval;
        }
    }
})();