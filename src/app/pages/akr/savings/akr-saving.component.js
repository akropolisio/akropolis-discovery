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
  function ComponentController() {
    var ctrl = this;

    ctrl.$onInit = function () {
    };


  }
})();