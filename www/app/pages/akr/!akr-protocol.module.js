(function () {
  'use strict';

  angular
    .module('akr-protocol', [
      'akr-commons',

      'akr-login',
      'akr-signup',
      'akr-pension'
    ])
    .config(routeConfig)

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        template: '<akr-login></akr-login>',
        title: 'Login'
      })
      .state('signup', {
        url: '/signup',
        template: '<akr-signup></akr-signup>',
        title: 'Create Account'
      })
      .state('wizard_summary', {
        url: '/wizard/summary',
        templateUrl: 'app/pages/akr/signup/summary.html',
        title: 'Create Account'
      })
      .state('pension_introduction', {
        url: '/pension/introduction',
        template: '<akr-pension-intro></akr-pension-intro>',
        title: 'Create Account'
      });
  }


})();