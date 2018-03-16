(function () {
  'use strict';

  angular.module('akr-commons')
    .service('AkrPreloaderService', AkrPreloaderService);

  /** @ngInject */
  function AkrPreloaderService($rootScope) {

    this.show = function (text) {
      $rootScope.$preloaderText = text;
      $rootScope.$showPreloder = true;
    };

    this.hide = function () {
      $rootScope.$showPreloder = false;
      $rootScope.$preloaderText = null;
    };

  }
})();