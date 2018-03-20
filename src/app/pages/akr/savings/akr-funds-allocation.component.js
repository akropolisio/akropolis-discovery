(function () {
  'use strict';

  angular.module('akr-pension')
    .component('akrFundsAllocation', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/savings/akr-funds-allocation.component.html'
    });

  /** @ngInject */
  function ComponentController(AkrWeb3Service, AkrSavingAccountsService, AkrPreloaderService,
                               $location, $timeout, toastr) {
    var ctrl = this;

    ctrl.$onInit = function () {
      AkrWeb3Service.pensionFunds().then(function (result) {
        ctrl.funds = result;
      });
    };

    ctrl.fundsSplitSum = function () {
      return Object.keys(ctrl.funds)
        .map(function (key) {
          return ctrl.funds[key].allocation;
        }).reduce(function (prev, current) {
          return prev + current;
        });
    };

    ctrl.otherAllocationSum = function (currentKey) {
      return Object.keys(ctrl.funds)
        .filter(function (key) {
          return key !== currentKey;
        })
        .map(function (key) {
          return ctrl.funds[key].allocation;
        }).reduce(function (prev, current) {
          return prev + current;
        });
    };

    ctrl.configureAllocations = function () {
      if (ctrl.fundsSplitSum() != 100) {
        toastr.error('Fund split must sum to 100%',
          {
            "positionClass": "toast-top-center"
          });
        return;
      }

      AkrPreloaderService.show("Creating saving accounts...")
      AkrSavingAccountsService.configureFundsAllocationAndCreateAccounts(ctrl.funds)
        .then(function (result) {
					console.log(result);
					$timeout(function () {
						AkrPreloaderService.hide();
						$location.path('/savings/deposit/VOLUNTARY/true');
					});
				});

    }


  }
})();