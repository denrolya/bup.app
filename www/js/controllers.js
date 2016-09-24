angular.module('app.controllers', [])

    .controller('AppCtrl', function ($rootScope, $scope, $ionicHistory) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $rootScope.showSearch = false;
        $rootScope.position;

        // Close search on page change
        $rootScope.$on("$locationChangeStart", function(event) {
            $rootScope.showSearch = false;
        });
        $rootScope.toggleSearch = function() {
            $rootScope.showSearch = !$rootScope.showSearch;
        }

        $rootScope.hasBackView = function() {
            return $ionicHistory.backView() !== null;
        }

        $rootScope.goBack = function () {
            $ionicHistory.goBack();
        };

        $rootScope.goToLink = function(link) {
            window.open(link, '_system', 'location=yes');
            return false;
        }

        $rootScope.getNumber = function(num) {
            return new Array(num);
        }
    });
