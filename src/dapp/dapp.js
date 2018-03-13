var Web3 = require("web3");
var contract = require("truffle-contract");
var AkropolisToken = contract(require("../../build/contracts/AkropolisToken.json"));
var UserRegistry = contract(require("../../build/contracts/UserRegistry.json"));
var User = contract(require("../../build/contracts/User.json"));
var AETFaucet = contract(require("../../build/contracts/AETFaucet.json"));
var DEPLOYMENT = require("../../build/deployment.json");

var mainAccount, userRegistry, networkId, faucet, token, user, wallet;

console.log(DEPLOYMENT);

function show(element, text) {
	var element = document.getElementById(element);
	if (element) {
		element.innerHTML = text;
	}
}

duration = {
	seconds: function (val) { return val; },
	minutes: function (val) { return val * this.seconds(60); },
	hours: function (val) { return val * this.minutes(60); },
	days: function (val) { return val * this.hours(24); },
	weeks: function (val) { return val * this.days(7); },
	years: function (val) { return val * this.days(365); },
};

function etherToWei (n) {
	return new web3.BigNumber(web3.toWei(n, 'ether'));
}

function weiToEther (n) {
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

	start: function() {
		this.setWhitelistedCount();
		this.setAllocationsSummary();
	},

	setAlert: function(message, type) {
		type = type || "info";
		var element = document.getElementById("alerts");
		element.innerHTML = "<div class='alert alert-" + type + "'>" + message + "</div>";
	},

	throwError: function(message, err) {
		err = err || message;
		this.setAlert("<strong>Error!</strong> " + message, "danger");
		throw err;
	},

	getNetworkName: function() {
		return idToNetworkName(networkId);
	},

	fetchUser: function()  {
		console.log("Fetching user...");
		return userRegistry.getUserContract(mainAccount).then(function(address) {
			console.log("Found user contract: " + address);
			if (address !== "0x0000000000000000000000000000000000000000") {
				return User.at(address).then(function(instance) {
					user = instance;
					return user.wallet();
				}).then(function(walletAddress) {
					console.log("Wallet contract: " + walletAddress);
					wallet = walletAddress;
					return Promise.resolve(user);
				});
			} else {
				return Promise.resolve(undefined);
			}
		});
	},

	getUser: function() {
		if (user) {
			return Promise.resolve(user);
		} else {
			return this.fetchUser();
		}
	},

	createUserAccount: function() {
		var self = this;
		return userRegistry.createUser(1, {from: mainAccount, gas: 3000000}).then(function(tx) {
			console.log("Creating user: " + tx.tx);
			return self.fetchUser();
		});
	},

	createDefaultAccounts: function() {
		console.log("Creating default savings accounts...");
		return user.createDefaultAccounts({from: mainAccount, gas: 4000000});
	},

	buyAETTokens: function(value) {
		var self = this;
		console.log("Buying AET Tokens: " + value);
		return self.getUser().then(function() {
			return faucet.getTokens(wallet, {from: mainAccount, value: web3.toWei(0.1, "ether"), gas: 1000000});
		});
	},

	getAETBalance: function() {
		return token.balanceOf(wallet);
	},

	ethAccount: function() {
		return mainAccount;
	}
};

window.addEventListener("load", function() {
	//TODO: Connect to inected web3 once deployed on testnet

	// if (typeof web3 !== "undefined") {
	// 	window.web3 = new Web3(web3.currentProvider);
	// } else {
	// 	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	// }

	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

	AkropolisToken.setProvider(web3.currentProvider);
	UserRegistry.setProvider(web3.currentProvider);
	User.setProvider(web3.currentProvider);
	AETFaucet.setProvider(web3.currentProvider);

	web3.eth.getAccounts(function(err, accounts) {
		if (err) {
			Dapp.throwError("Your browser can't see the decentralized web!", err);
		}
		if (accounts.length == 0) {
			Dapp.throwError("Connect an account!");
		}

		//Fetch contract instances
		AETFaucet.at(DEPLOYMENT.AETFaucet).then(function(instance) {
			faucet = instance;
		});

		UserRegistry.at(DEPLOYMENT.UserRegistry).then(function(instance) {
			userRegistry = instance;
		});



		AkropolisToken.at(DEPLOYMENT.AkropolisToken).then(function(instance) {
			token = instance;
			token.balanceOf(faucet.address).then(function(balance) {
				console.log("Initial faucet balance: " + balance.valueOf());
			})
		});

		mainAccount = accounts[0];
		networkId = web3.version.network;

		console.log("Main account: " + mainAccount);

	});
});