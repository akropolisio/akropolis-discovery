(function () {
  'use strict';

  var wizardConfig = {
    PASSPORT: {
      link: '#!/wizard/step_1',
      nextLink: '#!/wizard/step_2'
    },
    CONFIRMATION: {
      link: '#!/wizard/step_2',
      prevLink: '#!/wizard/step_1',
      nextLink: '#!/wizard/step_3'
    },
    GOALS: {
      link: '#!/wizard/step_3',
      prevLink: '#!/wizard/step_2'
    }
  };

  angular.module('akr-signup')
    .component('akrSignup', {
      controller: ComponentController,
      templateUrl: 'akr-pages/signup/akr-signup.component.html',
      bindings: {
        step: '@' //PASSPORT, CONFIRMATION, GOALS
      }
    });

  function ComponentController($interval, AkrUserService, AkrWeb3Service) {
    var ctrl = this;

    ctrl.isUploaded = false;
    ctrl.isUploading = false;
    ctrl.uploadProgress = null;

    ctrl.$onInit = function () {
      ctrl.nextLink = wizardConfig[ctrl.step].nextLink;
      ctrl.prevLink = wizardConfig[ctrl.step].prevLink;

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