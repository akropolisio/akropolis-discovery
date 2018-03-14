(function () {
  'use strict';

  angular.module('akr-dashboard')
    .component('akrDashboard', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/dashboard/akr-dashboard.component.html'
    });


  /** @ngInject */
  function ComponentController($location, AkrWeb3Service) {
    var ctrl = this;

    ctrl.$onInit = function () {
      AkrWeb3Service.accounts().then(function (result) {
        console.log(result);
        ctrl.accounts = result;
      });
    };

    ctrl.createSavingAccounts = function () {
			$location.path('/savings/introduction');
    };

    ctrl.hasSavingAccounts = function() {
      return ctrl.accounts && Object.keys(ctrl.accounts).length > 0;
    };



  }
})();