(function () {
  'use strict';

  angular.module('akr-commons')
    .service('AkrUserService', AkrUserService);

  /** @ngInject */
  function AkrUserService($q) {

    this.get = function () {
      return $q.when({
        firstName: 'Angela',
        lastName: 'Zoe',
        dateOfBirth: '1988-12-04',
        passportNumber: '925665416',
        nationality: 'British'
      });
    };

    this.age = function () {
      return Dapp.getUser()
        .then(function (user) {
          return user.dateOfBirth().then(function (dateOfBirth) {
            return moment().diff(parseInt(dateOfBirth)*1000, 'years');
          });
        })
    };

    this.calculatePensionBenefit = function (currentAge, retirementAge, lifeExpectancy, savings, avgFundReturns) {
      var capital = Math.pow(1 + avgFundReturns, (retirementAge - currentAge)) * savings;
      var benefit = capital / (lifeExpectancy - retirementAge) / 12;
      return benefit;
    }

  }
})();