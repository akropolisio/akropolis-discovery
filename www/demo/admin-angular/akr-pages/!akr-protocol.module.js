(function () {
    'use strict';

    angular
        .module('akr-protocol', [
            /*ng modules*/
            'ngRoute', 'ngAnimate',
            /*akr modules*/
            'akr-commons', 'akr-login', 'akr-signup'

        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    template: '<akr-login></akr-login>'
                })
                .when('/signup', {
                    template: '<akr-signup></akr-signup>'
                })
        });


})();