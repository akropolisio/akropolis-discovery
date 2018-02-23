(function () {
  'use strict';

  angular.module('akr-login')
    .component('akrLogin', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/login/akr-login.component.html'
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
      console.log('joinNow');
      $location.path('/signup')
    };


  }
})();