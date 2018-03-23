/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.charts',
    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.tables',

    'akr-protocol'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider) {
    if (Dapp.hasWeb3) {
			$urlRouterProvider.otherwise('/login');
		} else {
			$urlRouterProvider.otherwise('/error');
    }

  }

})();
