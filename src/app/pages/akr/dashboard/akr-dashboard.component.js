(function () {
  'use strict';

  angular.module('akr-dashboard')
    .component('akrDashboard', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/dashboard/akr-dashboard.component.html'
    });


  /** @ngInject */
  function ComponentController($location, $rootScope, AkrSavingAccountsService) {
    var ctrl = this;

    ctrl.accounts = null;
    $rootScope.$showPreloder = true;

    ctrl.$onInit = function () {
      AkrSavingAccountsService.accounts()
        .then(function (result) {
          console.log("Accounts loaded!");
          console.log(result);
          $rootScope.$showPreloder = false;
          ctrl.accounts = result;
          if (!$rootScope.$$phase) {
            $rootScope.$digest();
          }

        });
    };

    ctrl.createSavingAccounts = function () {
      $location.path('/savings/introduction');
    };

    ctrl.hasSavingAccounts = function () {
      return ctrl.accounts && Object.keys(ctrl.accounts).length > 0;
    };


  }
})();