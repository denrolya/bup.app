(function() {
    'use strict';

    angular
        .module('app.constants', [])
        .constant('apiUrl', '@@apiUrl')
        .constant('positionRefreshInterval', 120000);
})();