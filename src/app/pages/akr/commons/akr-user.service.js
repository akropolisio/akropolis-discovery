(function () {
  'use strict';

  angular.module('akr-commons')
    .service('AkrUserService', AkrUserService);

  /** @ngInject */
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

    this.age = function () {
      return Dapp.getUser()
        .then(function (user) {
          return user.dateOfBirth().then(function (dateOfBirth) {
            return moment().diff(parseInt(dateOfBirth.valueOf()), 'years');
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