(function () {
  'use strict';

  var FEE = 0.003;

  angular.module('akr-pension')
    .component('akrDeposit', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/savings/akr-deposit.component.html',
      bindings: {
        account: '@',
        initial: '<'
      }
    });

  /** @ngInject */
  function ComponentController($scope, $location, AkrWeb3Service) {
    var ctrl = this;
    ctrl.depositAmount = 100;

    ctrl.$onInit = function () {
      console.log('deposit on account: ' + ctrl.account);
    };

    ctrl.brutto = function () {
      return ctrl.depositAmount + FEE * ctrl.depositAmount;
    };

    ctrl.deposit = function () {
      if (ctrl.initial) {
        AkrWeb3Service.createSavingAccounts()
          .then(doInvest);
      } else {
        doInvest();
      }
    };

    function doInvest() {
      console.log('doInvest');
      return AkrWeb3Service.invest(ctrl.depositAmount, ctrl.account)
        .then(function () {
          //note: dapp promises are not 'standard' angularjs promises and they do not trigger digest cycle.
          //that's why we need to use $apply function.
          $scope.$apply(function () {
            $location.path('/dashboard');
            //TODO: add some sort of notitication?
          });
        });
    }


  }
})();