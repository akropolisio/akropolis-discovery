(function () {
  'use strict';

  //TODO: Connect when deployed on testnet
  angular.module('akr-commons')
    .service('RealAkrWeb3Service', AkrWeb3Service);

  /** @ngInject */
  function AkrWeb3Service($q) {

    var mockAccounts = {
      VOLUNTARY: {
        balance: 20000
      },
      EMERGENCY: {
        balance: 10000
      },
      SHORT_TERM: {
        balance: 5000
      }
    };

		this.createAccount = function () {
			return Dapp.createAccount();
		};

    this.hasAccount = function () {
      return Dapp.hasAccount();
    };

    this.ethAccount = function() {
      return Dapp.ethAccount();
    };

    this.savingsGoal = function () {
      return $q.when({
        age: 65,
        monthlyIncome: 3500
      });
    };

    this.accountDetails = function (type) {
      return mockAccounts[type];
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