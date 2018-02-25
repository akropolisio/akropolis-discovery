(function () {
  'use strict';

  angular.module('akr-pension')
    .component('akrSavingsIntro', {
      controller: ComponentController,
      templateUrl: 'app/pages/akr/savings/akr-savings-intro.component.html'
    });

  function ComponentController() {
    var ctrl = this;

    ctrl.$onInit = function () {
    };


  }
})();