(function () {
  'use strict';

  angular.module('akr-pension')
    .component('akrSaving', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/savings/akr-saving.component.html',
      bindings: {
        saving: '<',
        showDepositLink: '<'
      }
    });

  /** @ngInject */
  function ComponentController(AkrWeb3Service) {
    var ctrl = this;

    ctrl.$onInit = function () {
    };

    ctrl.invest = function (saving) {
      console.log(saving);
      //TODO: Navigate to deposit component and setup amount
			AkrWeb3Service.invest();
    }


  }
})();