(function () {
  'use strict';

  angular.module('akr-commons')
    .service('AkrUserService', AkrUserService);


  function AkrUserService($q) {

    this.get = function () {
      return $q.when({
        firstName: 'Jonathan',
        lastName: 'White',
        dateOfBirth: '1979-04-02',
        passportNumber: 'P2973GBR30',
        nationality: 'British'
      });
    };

  }
})();