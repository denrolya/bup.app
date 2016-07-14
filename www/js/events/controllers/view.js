(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewController', ViewController);

    ViewController.$inject = ['$stateParams'];
    function ViewController($stateParams) {
        var vm = this;

        console.log($stateParams);
    }
})();