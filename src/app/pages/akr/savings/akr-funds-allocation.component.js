(function () {
  'use strict';

  angular.module('akr-pension')
    .component('akrFundsAllocation', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/savings/akr-funds-allocation.component.html'
    });

  /** @ngInject */
  function ComponentController(AkrWeb3Service) {
    var ctrl = this;

    ctrl.$onInit = function () {
      AkrWeb3Service.pensionFunds().then(function (result) {
        ctrl.funds = result;
      });

    };


  }
})();