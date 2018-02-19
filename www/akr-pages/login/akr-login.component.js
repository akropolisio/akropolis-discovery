(function () {
  'use strict';

  angular.module('akr-login')
    .component('akrLogin', {
      controller: ComponentController,
      templateUrl: 'akr-pages/login/akr-login.component.html'
      /*transclude: {
          'header': 'eisCardHeader',
          'content': 'eisCardContent',
          'summary': 'eisCardSummary'
      },
      bindings: {
          inactive: '&?',
          productOfferKey: '@',
          isLast: '<',
          hasReferral: '<',
          quote: '<'
      },
      require: {
          compareCtrl: '^eisCompare'
      }*/

    });

  function ComponentController($location, AkrWeb3Service) {
    var ctrl = this;

    ctrl.hasAccount = null;

    ctrl.$onInit = function () {
      AkrWeb3Service.hasAccount()
        .then(function (result) {
          ctrl.hasAccount = result;
        });
    };

    ctrl.joinNow = function () {
      $location.path('/wizard/step_1')
    };


  }
})();