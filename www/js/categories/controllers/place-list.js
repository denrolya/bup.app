(function () {
    'use strict';

    angular
        .module('app')
        .controller('PlaceListController', PlaceListController);

    PlaceListController.$inject = ['$scope', '$ionicLoading', '$http', 'apiUrl', '$ionicPopup', '$stateParams', '$cordovaGeolocation', 'Category'];
    function PlaceListController($scope, $ionicLoading, $http, apiUrl, $ionicPopup, $stateParams, $cordovaGeolocation, Category) {
        var vm = this;
        var distanceMatrixService = new google.maps.DistanceMatrixService();

        vm.searchQuery = '';
        vm.category = $stateParams.category;
        vm.places = [];

        vm.getPlaces = getPlaces;
        vm.searchPlaces = searchPlaces;

        vm.getPlaces();

        $scope.closeLoading = function() { $ionicLoading.hide() }

        $scope.$on('distanceCalculated', function(e, args) {
            vm.places = args;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        });

        $scope.cancel = $ionicLoading.hide(); //Or whatever action you want to preform
        function getPlaces() {

            if (!ionic.Platform.is('browser')) {
                window.cordova.plugins.diagnostic.isLocationEnabled(function sc(enabled) {
                    $ionicLoading.show({template: '<p ng-click="closeLoading()">Getting current location...</p>', scope: $scope});
                    if (enabled) { places(true) }
                    else {
                        $ionicLoading.hide();

                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Please turn location settings on.',
                            template: 'By turning location service on your device on - you maximize pleasure of using it!'
                        });

                        confirmPopup.then(function(response) {
                            if(response) { cordova.plugins.diagnostic.switchToLocationSettings() }
                            else { places(false) }
                        });
                    }
                }, function ec(error) {
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicPopup.alert({
                        title: 'Error!',
                        template: 'Error happened while checking location service'
                    });
                });
            } else {
                places(true);
            }
        }

        function places(sortByDistance) {
            if (sortByDistance) {
                $ionicLoading.show({template: '<p ng-click="closeLoading()">Getting current location...</p>', scope: $scope});
                $cordovaGeolocation
                    .getCurrentPosition({maximumAge: 0})
                    .then(function sc(position) {
                        var params = {
                            closest: true,
                            categorySlug: vm.category.slug,
                            latitude: position.coords.latitude, longitude: position.coords.longitude
                        };
                        $ionicLoading.show({template: '<p ng-click="closeLoading()">Loading nearest places...</p>', scope: $scope });
                        Category.getPlaces(params, function sc(response) {
                            if (response.places.length > 0) {
                                $scope.$broadcast('distanceCalculated', response.places);
                            }
                        }, function ec(error) {
                            $scope.$broadcast('scroll.refreshComplete');
                            $ionicLoading.hide()
                        });

                    }, function ec(error) {
                        $scope.$broadcast('scroll.refreshComplete');
                        $ionicLoading.hide()
                    });
            } else {
                $ionicLoading.show({template: '<p ng-click="closeLoading()">Loading nearest places...</p>', scope: $scope });
                Category.getPlaces({categorySlug: vm.category.slug}, function sc(response) {
                    $scope.$broadcast('distanceCalculated', response.places);
                }, function ec(error) {
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicLoading.hide()
                });
            }
        }

        function searchPlaces() {
            $http.get(apiUrl + '/search/' + vm.searchQuery).then(function(response) {
                vm.places = response.data.places;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    }
})();