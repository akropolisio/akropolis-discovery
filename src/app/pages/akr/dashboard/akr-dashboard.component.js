(function () {
  'use strict';

  angular.module('akr-dashboard')
    .component('akrDashboard', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/dashboard/akr-dashboard.component.html'
    });


  /** @ngInject */
  function ComponentController(
    $location, $rootScope, $q,
    AkrSavingAccountsService, AkrWeb3Service, AkrUserService, AkrPreloaderService) {
    var ctrl = this;

    ctrl.accounts = null;

    AkrPreloaderService.show('Loading accounts...')

    ctrl.$onInit = function () {
      $q.all([AkrSavingAccountsService.accounts(), AkrWeb3Service.savingGoal(), AkrUserService.age()])
        .then(function (results) {
          console.log("Accounts loaded!");
          console.log(results);
          ctrl.accounts = results[0];
          ctrl.savingGoal = results[1];
          ctrl.age = results[2];


          console.log(ctrl.savingGoal);
          AkrPreloaderService.hide();

          $rootScope.$showPreloder = false;
          if (!$rootScope.$$phase) {
            $rootScope.$digest();
          }
        });
    };

    ctrl.createSavingAccounts = function () {
      $location.path('/savings/introduction');
    };


  }
})();