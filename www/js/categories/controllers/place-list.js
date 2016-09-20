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

        $scope.$on('distanceCalculated', function(e, args) {
            vm.places = args;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        });

        function getPlaces() {
            $ionicLoading.show({template: 'Loading nearest places...'});

            if (!ionic.Platform.is('browser')) {
                window.cordova.plugins.diagnostic.isLocationEnabled(function sc(enabled) {
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
                $cordovaGeolocation
                    .getCurrentPosition({maximumAge: 0})
                    .then(function sc(position) {
                        var params = {
                            closest: true,
                            categorySlug: vm.category.slug,
                            latitude: position.coords.latitude, longitude: position.coords.longitude
                        };

                        Category.getPlaces(params, function sc(response) {
                            console.log('3');
                            if (response.places.length > 0) {
                                $scope.$broadcast('distanceCalculated', response.places);
                            }
                        }, function ec(error) { $ionicLoading.hide() });

                    }, function ec(error) { $ionicLoading.hide() });
            } else {
                Category.getPlaces({categorySlug: vm.category.slug}, function sc(response) {
                    $scope.$broadcast('distanceCalculated', response.places);
                }, function ec(error) { $ionicLoading.hide() });
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