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

    this.savingsGoal = function () {
      return $q.when({
        age: 65,
        monthlyIncome: 3500
      });
    };

    //Acropolis External Token
    this.aetBalance = function () {
      return Dapp.getAETBalance()
        .then(function (result) {
          return result;
        });
    };

    this.configureFundsAllocationAndCreateAccounts = function (funds) {
      var fundKeys = [];
      var fundAllocations = [];

      Object.keys(funds).forEach(function (key) {
        fundKeys.push(key);
        fundAllocations.push(funds[key].allocation);
      });

      return Dapp.createAccountsWithFixedStrategy(fundKeys, fundAllocations);
    };

    this.pensionFunds = function () {
      return $q.when({
        TECH: {
          name: 'Tech',
          allocation: 25,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        SUSTAINABLE: {
          name: 'Sustainable',
          allocation: 25,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        BIOMED: {
          name: 'Biomed',
          allocation: 25,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        ENERGY: {
          name: 'Energy',
          allocation: 25,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      });

    };


  }
})();