(function () {
    'use strict';

    angular
        .module('app')
        .controller('CategoryViewController', CategoryViewController);

    CategoryViewController.$inject = ['$stateParams'];
    function CategoryViewController($stateParams) {
        var vm = this;

        vm.categorySlug = $stateParams.categorySlug;

        vm.testItems = [{
            name: "Lehel Tér Market",
            slug: 'lehel-ter-market',
            shortDescription: "Explore one of Budapest's most interesting markets.",
            distance: '2.1',
            coverImage: 'img/Pix/SW_Dylan+Rives-large.jpg'
        }, {
            name: "Nagy Beer Festival",
            slug: 'nagy-beer-festival',
            shortDescription: "Get a taste of Budapest's booming craft beer scene at this huge festival.",
            distance: '2.3',
            coverImage: 'img/Pix/pexels-photo-116025-large.jpeg'
        }, {
            name: "Oktogon Bistro",
            slug: 'oktogon-bistro',
            shortDescription: "Cheap eats in the heart of Budapest, check out Oktogon Bistro.",
            distance: '2.6',
            coverImage: 'img/Pix/people-party-dancing-music-large.jpg'
        }, {
            name: "Macondo Cafe",
            slug: 'macondo-cafe',
            shortDescription: "Colombian cafe in district 6. Come and check out Macondo Cafe.",
            distance: '2.8',
            coverImage: 'img/Pix/city-traffic-vehicles-people-large.jpg'
        }, {
            name: "Beatrice's Bar",
            slug: 'beatrices-bar',
            shortDescription: 'Authentically crafted coctails in a beautiful rooftop bar',
            distance: '2.9',
            coverImage: 'img/Pix/city-people-lights-village-large.jpg'
        }, {
            name: "London Film Festival",
            slug: 'london-film-festival',
            shortDescription: 'Explore some of the newest films. They are here.',
            distance: '3.0',
            coverImage: 'img/Pix/city-cars-traffic-lights-large.jpeg'
        }, {
            name: "Szimpla Kert",
            slug: 'szimpla-kert',
            shortDescription: "Budapest's most popular ruin bar, opened utill 3am in the heart of Budapest.",
            distance: '3.2',
            coverImage: 'img/Pix/pexels-photo-87216-large.jpeg'
        }];
    }
})();