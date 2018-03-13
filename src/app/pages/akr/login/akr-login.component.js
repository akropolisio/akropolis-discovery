(function () {
  'use strict';

  angular.module('akr-login')
    .component('akrLogin', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/login/akr-login.component.html'
    });

  /** @ngInject */
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

		ctrl.signIn = function () {
			console.log('signIn');
			$location.path('/dashboard');
		};

		ctrl.test = function() {
			AkrWeb3Service.createSavingAccounts();
		};

  }
})();