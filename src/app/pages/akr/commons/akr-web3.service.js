(function () {
  'use strict';

  angular.module('akr-commons')
    .service('AkrWeb3Service', AkrWeb3Service);

  /** @ngInject */
  function AkrWeb3Service($q) {

    this.createUserAccount = function (dateOfBirth, age, monthlyIncome) {
      return Dapp.createUserAccount(dateOfBirth, age, monthlyIncome);
    };

    this.hasAccount = function () {
      return Dapp.getUser().then(function (user) {
        return $q.when(user !== undefined);
      });
    };

    this.ethAccount = function () {
      return Dapp.ethAccount();
    };

    this.buyAETTokens = function (value) {
      return Dapp.buyAETTokens(value).then(function (result) {
        console.log(result);
        return Dapp.getAETBalance().then(function (result) {
          return $q.when(result);
        });
      });

    };

    this.savingGoal = function () {
      return Dapp.getSavingGoal();
    };

    //Acropolis External Token
    this.aetBalance = function () {
      return Dapp.getAETBalance()
        .then(function (result) {
          return result;
        });
    };

    this.pensionFunds = function () {
      return $q.when({
        TECH: {
          name: 'Tech',
          allocation: 25,
          description: ''
        },
        SUSTAINABLE: {
          name: 'Sustainable',
          allocation: 25,
          description: ''
        },
        BIOMED: {
          name: 'Biomed',
          allocation: 25,
          description: ''
        },
        ENERGY: {
          name: 'Energy',
          allocation: 25,
          description: ''
        }
      });

    };


  }
})();
