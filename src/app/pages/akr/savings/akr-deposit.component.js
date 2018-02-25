(function () {
  'use strict';

  var FEE = 0.003;

  angular.module('akr-pension')
    .component('akrDeposit', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/savings/akr-deposit.component.html'
    });

  /** @ngInject */
  function ComponentController(AkrWeb3Service) {
    var ctrl = this;
    ctrl.depositAmount = 100;

    ctrl.$onInit = function () {};

    ctrl.brutto = function () {
      return ctrl.depositAmount + FEE * ctrl.depositAmount;
    };


  }
})();