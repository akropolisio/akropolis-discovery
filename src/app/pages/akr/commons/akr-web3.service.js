(function () {
  'use strict';

  angular.module('akr-commons')
    .service('AkrWeb3Service', AkrWeb3Service);

  /** @ngInject */
  function AkrWeb3Service($q) {

    var mockSavingsAccounts = {
      VOLUNTARY: {
        label: 'Pension',
        additionalInfo: 'from age 62'
      },
      EMERGENCY: {
        label: 'Emergency Fund',
        additionalInfo: 'from age 62'
      },
      SHORT_TERM: {
        label: 'Short Term Savings',
        additionalInfo: 'in 1 year'
      }
    };

    this.createUserAccount = function (dateOfBirth) {
      return Dapp.createUserAccount(dateOfBirth);
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

    this.createSavingAccounts = function () {
      console.log('createSavingAccounts');
      return Dapp.hasSavingAccount()
        .then(function (hasAccount) {
          console.log('hasSavingAccount: ' + hasAccount);
          if (!hasAccount) {
            return Dapp.createDefaultAccounts()
              .then(function (tx) {
                console.log("Savings accounts created in: " + tx.tx);
                return true;
              });
          } else {
            return false
          }
        });
    };

    this.invest = function (value, account) {
      console.log('dapp invest');
      return Dapp.invest(value, account)
        .then(function (tx) {
          console.log("Investment: " + tx);
          return true;
        });
    };

    this.accounts = function () {

      return Dapp.hasSavingAccount()
        .then(function (hasAccount) {
          console.log('hasAccount: ' + hasAccount);
          return hasAccount ? accountsWithBalance() : $q.when({});
        });

      function accountsWithBalance() {
        var accounts = angular.copy(mockSavingsAccounts);
        var promises = {};
        Object.keys(accounts).forEach(function (key) {
          promises[key] = Dapp.getSavingAccountBalance(key);
        });
        return $q.all(promises)
          .then(function (results) {
            console.log('balance download complete');
            console.log(results);
            Object.keys(accounts).forEach(function (key) {
              accounts[key].balance = parseInt(results[key]);
            });
            return accounts;
          });

      }
    };

    //Acropolis External Token
    this.aetBalance = function () {
      return Dapp.getAETBalance()
        .then(function (result) {
          return result;
        });
    };


    this.configureFundsAllocation = function (funds) {
      var fundKeys = [];
      var fundAllocations = [];

      Object.keys(funds).forEach(function (key) {
        fundKeys.push(key);
        fundAllocations.push(funds[key].allocation);
      });

      return Dapp.createFixedAllocationInvestmentStrategy(fundKeys, fundAllocations);
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