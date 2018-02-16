(function () {
  'use strict';

  angular.module('akr-commons')
    .service('akrWeb3Service', AkrWeb3Service);


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


    this.hasAccount = function () {
      return $q.when(true);
    };


    /*
    TODO: move to separate service
    this.userData = function () {
      return {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('1990-12-12')
      };
    };*/

    this.savingsGoal = function () {
      return {
        age: 65,
        monthlyIncome: 3500
      };
    };

    this.accountDetails = function (type) {
      return mockAccounts[type];
    };

    //Acropolis External Token
    this.aetBalance = function () {
      return 100;
    };

    this.pensionFunds = function () {
      return {
        TECH: {
          name: 'Tech',
          description: 'Tech desc'
        },
        SUSTAINABLE: {
          name: 'SUSTAINABLE',
          description: 'SUSTAINABLE desc'
        },
        BIOMED: {
          name: 'BIOMED',
          description: 'BIOMED desc'
        },
        ENERGY: {
          name: 'Energy',
          description: 'Energy desc'
        }
      };
    };


  }
})();