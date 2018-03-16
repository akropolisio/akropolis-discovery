var Web3 = require("web3");
var contract = require("truffle-contract");
var AkropolisToken = contract(require("../../build/contracts/AkropolisToken.json"));

var UserRegistry = contract(require("../../build/contracts/UserRegistry.json"));
var PensionFundsRegistry = contract(require("../../build/contracts/PensionFundsRegistry.json"));
var PaymentGateway = contract(require("../../build/contracts/PaymentGateway.json"));

var Wallet = contract(require("../../build/contracts/Wallet.json"));
var User = contract(require("../../build/contracts/User.json"));
var SavingGoal = contract(require("../../build/contracts/SavingGoal.json"));
var AETFaucet = contract(require("../../build/contracts/AETFaucet.json"));
var DEPLOYMENT = require("../../build/deployment.json");

var mainAccount, userRegistry, networkId, faucet, token, user, walletAddr, savingGoal;

console.log(DEPLOYMENT);

//DEPLOYMENT.UserRegistry = "0x29b96ea0b863184ba2ede09351fbecf98710d0fb";

function show(element, text) {
  var element = document.getElementById(element);
  if (element) {
    element.innerHTML = text;
  }
}

duration = {
  seconds: function (val) {
    return val;
  },
  minutes: function (val) {
    return val * this.seconds(60);
  },
  hours: function (val) {
    return val * this.minutes(60);
  },
  days: function (val) {
    return val * this.hours(24);
  },
  weeks: function (val) {
    return val * this.days(7);
  },
  years: function (val) {
    return val * this.days(365);
  },
};

function etherToWei(n) {
  return new web3.BigNumber(web3.toWei(n, 'ether'));
}

function weiToEther(n) {
  return new web3.BigNumber(web3.fromWei(n, 'ether'));
}

function idToNetworkName(networkId) {
  switch (networkId) {
    case "1":
      return "Main";
    case "2":
      return "Morden";
    case "3":
      return "Ropsten";
    case "4":
      return "Rinkeby";
    case "42":
      return "Kovan";
    default:
      return "Unknown";
  }
}

window.Dapp = {

  start: function () {
    this.setWhitelistedCount();
    this.setAllocationsSummary();
  },

  setAlert: function (message, type) {
    type = type || "info";
    var element = document.getElementById("alerts");
    element.innerHTML = "<div class='alert alert-" + type + "'>" + message + "</div>";
  },

  throwError: function (message, err) {
    err = err || message;
    this.setAlert("<strong>Error!</strong> " + message, "danger");
    throw err;
  },

  getNetworkName: function () {
    return idToNetworkName(networkId);
  },

  fetchUser: function () {
    console.log("Fetching user...");
    return userRegistry.getUserContract(mainAccount).then(function (address) {
      console.log("Found user contract: " + address);
      if (address !== "0x0000000000000000000000000000000000000000") {
        return User.at(address).then(function (instance) {

          user = instance;
          return Promise.all([user.wallet(), user.savingGoal()]);
        }).then(function (addresses) {
          console.log("Wallet and saving goals addresses: ");
          console.log(addresses);
          walletAddr = addresses[0];
          var savingGoalAddr = addresses[1];
          return SavingGoal.at(savingGoalAddr)
            .then(function (instance) {
              console.log('Saving goal instance: ' + instance);
              return Promise.all([instance.age(), instance.monthlyIncome()])
                .then(function (result) {
                  console.log('Saving goal data:');
                  console.log(result);
                  savingGoal = {
                    age: parseInt(result[0].valueOf()),
                    monthlyIncome: parseInt(result[1].valueOf())
                  };

                  return Promise.resolve(user);
                });
            });
        });
      } else {
        return Promise.resolve(undefined);
      }
    });
  },

  getUser: function () {
    if (user) {
      return Promise.resolve(user);
    } else {
      return this.fetchUser();
    }
  },

  getSavingGoal: function () {
    if (savingGoal) {
      return Promise.resolve(savingGoal);
    } else {
      return this.fetchUser()
        .then(function () {
          return savingGoal;
        });
    }
  },

  createUserAccount: function (dateOfBirth, retirementAge, monthlyIncome) {
    var self = this;
    var dateAsUnixTimestampInSeconds = Math.floor(new Date(dateOfBirth) / 1000);
    console.log("dateOfBirth: " + dateAsUnixTimestampInSeconds);
    return userRegistry.createUser(dateAsUnixTimestampInSeconds, retirementAge, monthlyIncome, {
      from: mainAccount,
      gas: 6000000
    })
      .then(function (tx) {
        console.log("Creating user: " + tx.tx);
        return self.fetchUser();
      });
  },

  hasSavingAccount: function () {
    var self = this;
    return self.getUser().then(function (user) {
      return user.getSavingAccountsCount().then(function (count) {
        console.log("Saving accounts count: " + count);
        return count > 0;
      })
    })
  },

  createDefaultAccounts: function () {
    console.log("Creating default savings accounts...");
    return this.getUser().then(function (user) {
      console.log('user');
      return user.createDefaultAccounts({from: mainAccount, gas: 4000000});
    });
  },

  buyAETTokens: function (value) {
    var self = this;
    console.log("Buying AET Tokens: " + value);
    return self.getUser().then(function () {
      return faucet.getTokens(walletAddr, {from: mainAccount, value: web3.toWei(0.1, "ether"), gas: 1000000});
    });
  },

  getAETBalance: function () {
    return token.balanceOf(walletAddr);
  },

  ethAccount: function () {
    return mainAccount;
  },

  getSavingAccountBalance: function (accountName) {
    return this.getUser().then(function (user) {
      return user.getSavingAccountValue(accountName, {from: mainAccount})
        .then(function (value) {
          console.log("Savings: " + value.valueOf());
          return value.valueOf();
        });
    });
  },

  /**
   *
   * @param value in cents, so 10USD = 1000 units
   * @param account of the savings account
   */
  invest: function (value, account) {
    return this.getUser().then(function (user) {
      return user.invest(value, account, {from: mainAccount, gas: 4000000});
    });
  },

  /**
   *
   * @param fund of the fund
   * @param value in cents, so 10USD = 1000 units
   * @param account of the savings account
   */
  investIntoFund: function (fund, value, account) {
    return this.getUser().then(function (user) {
      return user.investIntoFund(fund, value, account, {from: mainAccount, gas: 4000000});
    });
  },

  createFixedAllocationInvestmentStrategy: function (funds, allocations) {
    return this.getUser()
      .then(function (user) {
        return user.createFixedAllocationInvestmentStrategy(funds, allocations, {from: mainAccount, gas: 4000000});
      });
  }

};

window.Dapp.initComplete = false;


window.addEventListener("load", function () {
  console.log("load");

  //TODO: Connect to inected web3 once deployed on testnet

  // if (typeof web3 !== "undefined") {
  // 	window.web3 = new Web3(web3.currentProvider);
  // } else {
  // 	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  // }

  window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

  AkropolisToken.setProvider(web3.currentProvider);
  UserRegistry.setProvider(web3.currentProvider);
  PensionFundsRegistry.setProvider(web3.currentProvider);
  User.setProvider(web3.currentProvider);
  AETFaucet.setProvider(web3.currentProvider);
  Wallet.setProvider(web3.currentProvider);
  PaymentGateway.setProvider(web3.currentProvider);
  SavingGoal.setProvider(web3.currentProvider);

  web3.eth.getAccounts(function (err, accounts) {
    if (err) {
      Dapp.throwError("Your browser can't see the decentralized web!", err);
    }
    if (accounts.length == 0) {
      Dapp.throwError("Connect an account!");
    }

    //Fetch contract instances
    var AETFaucetPromise = AETFaucet.at(DEPLOYMENT.AETFaucet);
    var UserRegistryPromise = UserRegistry.at(DEPLOYMENT.UserRegistry);

    AETFaucetPromise.then(function (instance) {
      faucet = instance;

      AkropolisToken.at(DEPLOYMENT.AkropolisToken).then(function (instance) {
        token = instance;

        UserRegistryPromise.then(function (instance) {
          console.log('UserRegistry');
          console.log(instance);
          userRegistry = instance;
          window.Dapp.initComplete = true;
        });

        console.log("Faucet address: " + faucet.address);
        token.balanceOf(faucet.address).then(function (balance) {
          console.log("Initial faucet balance: " + balance.valueOf());
        })
      });

    });


    mainAccount = accounts[0];
    networkId = web3.version.network;

    console.log("Main account: " + mainAccount);

  });
});