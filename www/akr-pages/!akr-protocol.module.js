(function () {
  'use strict';

  angular
    .module('akr-protocol', [
      /*ng modules*/
      'ngRoute', 'ngAnimate',
      /*akr modules*/
      'akr-commons', 'akr-login', 'akr-signup', 'akr-pension'

    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          template: '<akr-login></akr-login>'
        })
        .when('/wizard/step_1', {
          template: '<akr-signup step="PASSPORT"></akr-signup>'
        })
        .when('/wizard/step_2', {
          template: '<akr-signup step="CONFIRMATION"></akr-signup>'
        })
        .when('/wizard/step_3', {
          template: '<akr-signup step="GOALS"></akr-signup>'
        })
        .when('/wizard/summary', {
          templateUrl: 'akr-pages/signup/summary.html'
        })
        .when('/pension/introduction', {
          template: '<akr-pension-intro></akr-pension-intro>'
        })

    });


})();