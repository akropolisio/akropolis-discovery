(function () {
  'use strict';

  //TODO: Connect when deployed on testnet
  angular.module('akr-commons')
    .service('AkrWeb3Service', AkrWeb3Service);

  /** @ngInject */
  function AkrWeb3Service($q) {

    var savingsAccountsCreated = true;

    var mockSavingsAccounts = {
      VOLUNTARY: {
        label: 'Pension',
        balance: 20000,
        additionalInfo: 'from age 62'
      },
      EMERGENCY: {
        label: 'Emergency Fund',
        balance: 10000,
        additionalInfo: 'from age 62'
      },
      SHORT_TERM: {
        label: 'Short Term Savings',
        balance: 5000,
        additionalInfo: 'in 1 year'
      }
    };

		this.createUserAccount = function () {
			return Dapp.createUserAccount();
		};

    this.hasAccount = function () {
      return Dapp.getUser().then(function(user) {
        return $q.when(user !== undefined);
      });
    };

    this.ethAccount = function() {
      return Dapp.ethAccount();
    };

    this.buyAETTokens = function(value) {
      return Dapp.buyAETTokens(value).then(function(result) {
        console.log(result);
				return Dapp.getAETBalance().then(function(result) {
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

    this.createSavingAccounts = function() {
      return Dapp.createDefaultAccounts().then(function(tx) {
			  console.log("Savings accounts created in: " + tx.tx);
				savingsAccountsCreated = true;
				return $q.when(savingsAccountsCreated);
			});
    };

    this.accounts = function () {
      return $q.when(savingsAccountsCreated ? mockSavingsAccounts : {});
    };

    //Acropolis External Token
    this.aetBalance = function () {
      return 100;
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