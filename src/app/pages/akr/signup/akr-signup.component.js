(function () {
  'use strict';

  angular.module('akr-signup')
    .component('akrSignup', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/signup/akr-signup.component.html'
    });

  var DEFAULT_SAVING_GOAL = {
    age: 65,
    monthlyIncome: 3500
  };


  /** @ngInject */
  function ComponentController($interval, $scope, $timeout, $location,
                               AkrUserService, AkrWeb3Service, AkrMsgCenterService, AkrPreloaderService,
                               toastr) {
    var ctrl = this;

    ctrl.isUploaded = false;
    ctrl.isUploading = false;
    ctrl.uploadProgress = null;

    ctrl.$onInit = function () {
      AkrUserService.get().then(function (result) {
        ctrl.user = result;
      });

      ctrl.savingsGoal = angular.copy(DEFAULT_SAVING_GOAL);
    };

    ctrl.upload = function () {
      ctrl.uploadProgress = 0;
      ctrl.isUploading = true;
      var promise = $interval(function () {
        if (ctrl.uploadProgress > 99) {
          $interval.cancel(promise);
          $timeout(function () {
            ctrl.isUploading = false;
            ctrl.isUploaded = true;
            toastr.clear();
          }, 400);

        }
        else {
          ctrl.uploadProgress += 5;
        }
      }, 100);

    };

    ctrl.showPassportValidationMessage = function () {
      toastr.error('Please update passport photo',
        {
          "positionClass": "toast-top-center"
        });
    };

    ctrl.createUser = function () {
      AkrPreloaderService.show('Creating user account...');
      AkrWeb3Service.createUserAccount(ctrl.user.dateOfBirth, ctrl.savingsGoal.age, ctrl.savingsGoal.monthlyIncome)
        .then(function (result) {

          toastr.info('<p>Your account is being verified now. We\'ll notify you as soon as that\'s complete.</p>\n' +
            '          <p>Please confirm purchasing 100 AET tokens so you can use all of the features of this portal.</p>',
            'Welcome!', {
              "autoDismiss": false,
              "positionClass": "toast-top-center",
              "type": "info",
              "timeOut": "10000",
              "extendedTimeOut": "2000",
              "allowHtml": true,
              "closeButton": true,
              "tapToDismiss": true,
              "progressBar": false,
              "newestOnTop": true,
              "maxOpened": 0,
              "preventDuplicates": false,
              "preventOpenDuplicates": false
            });

          AkrMsgCenterService.message('message', 'Your account is being verified now. We\'ll notify you as soon as that\'s complete')

          AkrPreloaderService.show('Buying tokens...');
          AkrWeb3Service.buyAETTokens(100)
            .then(function () {
              console.log('tokens bought');
              AkrPreloaderService.hide();
              AkrMsgCenterService.message('notification', 'Opened account and initial AET deposit notification');
              $scope.$apply(function () {
								$location.path('/dashboard');
							});
            });

        });
    };

  }
})();