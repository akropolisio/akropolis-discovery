(function () {
  'use strict';

  angular.module('akr-error')
    .component('akrError', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/error/akr-error.component.html'
    });

  /** @ngInject */
  function ComponentController($location) {
    var ctrl = this;

    ctrl.hasAccount = null;

    ctrl.$onInit = function () {
      ctrl.network = Dapp.network;

      if (ctrl.network == 'Kovan') {
				$location.path('/login');
      }
    };
  }
})();