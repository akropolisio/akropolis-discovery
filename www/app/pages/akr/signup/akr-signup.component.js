(function () {
  'use strict';

  angular.module('akr-signup')
    .component('akrSignup', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/signup/akr-signup.component.html'
    });

  function ComponentController($interval, AkrUserService, AkrWeb3Service) {
    var ctrl = this;

    ctrl.isUploaded = false;
    ctrl.isUploading = false;
    ctrl.uploadProgress = null;

    ctrl.$onInit = function () {
      AkrUserService.get().then(function (result) {
        ctrl.user = result;
      });

      AkrWeb3Service.savingsGoal().then(function (result) {
        ctrl.savingsGoal = result;
      });
    };

    ctrl.upload = function () {
      ctrl.uploadProgress = 0;
      ctrl.isUploading = true;
      var promise = $interval(function () {
        if (ctrl.uploadProgress > 99) {
          $interval.cancel(promise);
          ctrl.isUploaded = true;
          ctrl.isUploading = false;
        }
        else {
          ctrl.uploadProgress++;
        }
      }, 20);
    };

  }
})();