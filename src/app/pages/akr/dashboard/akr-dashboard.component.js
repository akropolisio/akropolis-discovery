(function () {
  'use strict';

  angular.module('akr-dashboard')
    .component('akrDashboard', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/dashboard/akr-dashboard.component.html'
    });


  /** @ngInject */
  function ComponentController(AkrWeb3Service) {
    var ctrl = this;

    ctrl.$onInit = function () {
      AkrWeb3Service.accounts().then(function (result) {
        ctrl.accounts = result;
      });
    };
  }
})();