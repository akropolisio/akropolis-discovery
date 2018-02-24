(function () {
  'use strict';

  angular.module('akr-commons')
    .component('akrStepper', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/commons/stepper/akr-stepper.component.html',
      bindings: {
        model: '=',
        max: '<',
        min: '<',
        step: '<',
        filter: '@'
      }
    });

  function ComponentController() {
    var ctrl = this;

    ctrl.$onInit = function () {
      if (angular.isUndefined(ctrl.model)) {
        ctrl.model = 0;
      }
    };

    ctrl.plus = function () {
      if (ctrl.model == ctrl.max) {
        return;
      }

      ctrl.model = ctrl.model + ctrl.step;
    };

    ctrl.minus = function () {
      if (ctrl.model == ctrl.min) {
        return;
      }

      ctrl.model = ctrl.model - ctrl.step;
    };
  }
})();