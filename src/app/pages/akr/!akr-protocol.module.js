(function () {
  'use strict';

  angular
    .module('akr-protocol', [
      'akr-commons',

      'akr-login',
      'akr-error',
      'akr-signup',
      'akr-dashboard',
      'akr-pension',
      'akr-msg-center',
      'akr-charts'
    ])
    .config(routeConfig)
    .config(toastrConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        template: '<akr-login></akr-login>',
        title: 'Login'
      })
			.state('error', {
				url: '/error',
				template: '<akr-error></akr-error>',
				title: 'Error'
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
      .state('dashboard', {
        url: '/dashboard',
        template: '<akr-dashboard></akr-dashboard>',
        title: 'Dashboard'
      })
      .state('savings_introduction', {
        url: '/savings/introduction',
        template: '<akr-savings-intro></akr-savings-intro>',
        title: 'Savings system'
      })
      .state('funds_allocations', {
        url: '/savings/funds',
        template: '<akr-funds-allocation></akr-funds-allocation>',
        title: 'Savings system'
      })
      .state('deposit', {
        url: '/savings/deposit/:account/:initial',
        template: function(params) {
          var initial = angular.isDefined(params.initial) ? params.initial : false;
          return '<akr-deposit account="' + params.account + '" initial="' + initial + '"></akr-deposit>';
        },
        title: 'Deposit'
      })
    ;
  }

  /** @ngInject */
  function toastrConfig(toastrConfig) {
    angular.extend(toastrConfig, {
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 0,
      newestOnTop: true,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: 'body'
    });
  }


})();