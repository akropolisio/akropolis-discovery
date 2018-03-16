(function () {
  'use strict';

  angular.module('akr-commons')
    .service('AkrSavingAccountsService', AkrSavingAccountsService);

  /** @ngInject */
  function AkrSavingAccountsService($q) {

    var _state = {
      VOLUNTARY: {
        label: 'Pension',
        additionalInfo: 'from age {}',
        balance: null,
        $dirty: true
      },
      EMERGENCY: {
        label: 'Emergency Fund',
        additionalInfo: 'from age {}',
        balance: null,
        $dirty: true
      },
      SHORT_TERM: {
        label: 'Short Term Savings',
        additionalInfo: 'in 1 year',
        balance: null,
        $dirty: true
      }
    };

    var _hasAccount = null;

    this.configureFundsAllocationAndCreateAccounts = function (funds) {
      console.log('createSavingAccounts');
      return this.hasSavingAccounts()
        .then(function (hasAccount) {
          console.log('hasSavingAccount: ' + hasAccount);
          if (!hasAccount) {
            var fundKeys = [];
            var fundAllocations = [];

            Object.keys(funds).forEach(function (key) {
              fundKeys.push(key);
              fundAllocations.push(funds[key].allocation);
            });

            return Dapp.createAccountsWithFixedStrategy(fundKeys, fundAllocations)
              .then(function (tx) {
                _hasAccount = true;
              });
          }
        });
    };

    this.accounts = function () {
      var self = this;

      return self.hasSavingAccounts()
        .then(function (hasAccount) {
          console.log('hasAccount: ' + hasAccount);
          return hasAccount ? accountsWithBalance() : $q.when(null);
        });

      function accountsWithBalance() {
        var promises = {};

        Object.keys(_state)
          .filter(function (key) {
            return _state[key].$dirty;
          })
          .forEach(function (key) {
            promises[key] = Dapp.getSavingAccountBalance(key);
          });

        return $q.all(promises)
          .then(function (results) {
            console.log('balance download complete');
            console.log(results);
            Object.keys(promises).forEach(function (key) {
              _state[key].balance = parseInt(results[key]);
              _state[key].$dirty = false;
            });
            return angular.copy(_state);
          });
      }
    };

    this.invest = function (value, account) {
      console.log('dapp invest');
      return Dapp.invest(value, account)
        .then(function (tx) {
          _state[account].$dirty = true;
          console.log("Investment: " + tx);
          return true;
        });
    };

    this.hasSavingAccounts = function () {
      if (_hasAccount !== null) {
        return $q.when(_hasAccount);
      }

      return Dapp.hasSavingAccount()
        .then(function (hasAccount) {
          _hasAccount = hasAccount;
          return $q.when(_hasAccount);
        });
    };

  }
})();