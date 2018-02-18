(function () {
  'use strict';

  angular.module('akr-pension')
    .component('akrPensionIntro', {
      controller: ComponentController,
      templateUrl: 'akr-pages/pension/akr-pension-intro.component.html'
    });

  function ComponentController() {
    var ctrl = this;

    ctrl.$onInit = function () {
    };



  }
})();