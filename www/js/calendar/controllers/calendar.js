(function () {
    'use strict';

    angular
        .module('app')
        .controller('CalendarController', CalendarController);

    CalendarController.$inject = [];
    function CalendarController() {
        var vm = this;

        vm.testDates = [
            new Date('07.01.2016'), new Date('07.02.2016')
        ];
    }
})();