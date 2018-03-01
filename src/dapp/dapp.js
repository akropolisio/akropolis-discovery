var Web3 = require("web3");
var contract = require("truffle-contract");
var UserFactory = contract(require("../../build/contracts/UserFactory.json"));
var AkropolisToken = contract(require("../../build/contracts/AkropolisToken.json"));
var UserRegistry = contract(require("../../build/contracts/UserRegistry.json"));

var mainAccount, networkId;

const USER_FACTORY = "0x6cf23552c72ffe11638274514b9aaf477d15f0db";

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

	createAccount: function() {
		var self = this;
		console.log("Hello from Dapp");
		return UserFactory.at(USER_FACTORY).then(function(instance) {
			return instance.createUser(1, {from: mainAccount, gas: 1000000}).then(function(tx) {
				console.log("Creating user: " + tx.tx);
				return self.getUserContract();
			});
		});

	},

	hasAccount: function() {
		return this.getUserContract().then(function(contractAddress) {
			console.log("User contract: " + contractAddress);
			return contractAddress !== "0x0000000000000000000000000000000000000000";
		});
	},

	getUserContract: function() {
		return UserFactory.at(USER_FACTORY).then(function(instance) {
			return instance.userRegistry();
		}).then(function(registryAddress) {
			return UserRegistry.at(registryAddress);
		}).then(function(registry) {
			return registry.getUserContract(mainAccount);
		});
	},

	ethAccount: function() {
		return mainAccount;
	}

	// setWhitelistedCount: function() {
	// 	Whitelist.deployed().then(function(instance) {
	// 		return instance.getWhitelistedCount.call();
	// 	}).then(function(value) {
	// 		show("whitelisted-count", value.valueOf());
	// 	}).catch(function(err) {
	// 		console.log(err);
	// 	});
	// },
	//
	// addToWhitelist: function() {
	// 	var self = this;
	// 	var address = document.getElementById("buyer-address").value;
	// 	console.log("Adding to whitelist: " + address);
	// 	Whitelist.deployed().then(function(instance) {
	// 		self.setAlert("Adding to the whitelist...");
	// 		return instance.addToWhitelist(address, {from: adminAccount});
	// 	}).then(function() {
	// 		self.setWhitelistedCount();
	// 		self.setAlert("Buyer was added!", "success");
	// 	}).catch(function(err) {
	// 		Dapp.throwError("Cannot add to the whitelist!");
	// 		console.log(err);
	// 	});
	// },
	//
	// removeFromWhitelist: function() {
	// 	var self = this;
	// 	var address = document.getElementById("remove-address").value;
	// 	console.log("Removing from whitelist: " + address);
	// 	Whitelist.deployed().then(function(instance) {
	// 		self.setAlert("Removing from the whitelist...");
	// 		return instance.removeFromWhitelist(address, {from: adminAccount});
	// 	}).then(function() {
	// 		self.setWhitelistedCount();
	// 		self.setAlert("Buyer was removed!", "success");
	// 	}).catch(function(err) {
	// 		Dapp.throwError("Cannot remove from the whitelist!");
	// 		console.log(err);
	// 	});
	// },
	//
	// checkAddress: function() {
	// 	var self = this;
	// 	var address = document.getElementById("check-address").value;
	// 	console.log("Checking address: " + address);
	// 	Whitelist.deployed().then(function(instance) {
	// 		self.setAlert("Checking address...");
	// 		return instance.isWhitelisted(address, {from: adminAccount});
	// 	}).then(function(result) {
	// 		console.log(result);
	// 		if (result) {
	// 			self.setAlert("Address: " + address + " is whitelisted.", "success");
	// 		} else {
	// 			self.setAlert("Address: " + address + " is NOT whitelisted.", "danger");
	// 		}
	// 	}).catch(function(err) {
	// 		Dapp.throwError("Cannot check the address!");
	// 		console.log(err);
	// 	});
	// },
	//
	// fetchWhitelistedAddress: function(index, max, contract, element) {
	// 	var self = this;
	// 	if (index<max) {
	// 		contract.getWhitelistedAddress(index).then(function (value) {
	// 			element.innerHTML = element.innerHTML + value + "<br/>";
	// 			return self.fetchWhitelistedAddress(index+1, max, contract, element);
	// 		}).catch(function(err) {
	// 			console.log(err);
	// 		});
	// 	}
	// },
	//
	// listAllWhitelisted: function() {
	// 	var self = this;
	// 	var contract;
	// 	var element = document.getElementById("whitelisted-list");
	// 	element.innerHTML = "";
	// 	Whitelist.deployed().then(function(instance) {
	// 		contract = instance;
	// 		return instance.getWhitelistedCount.call();
	// 	}).then(function(max) {
	// 		return self.fetchWhitelistedAddress(0, max, contract, element);
	// 	}).catch(function(err) {
	// 		console.log(err);
	// 	});
	// },
	//
	// setAllocationsSummary: function() {
	// 	this.allocations.totalAllocated().then(function(total){
	// 		show("allocations-total", weiToEther(total).valueOf());
	// 	}).catch(function(err) {
	// 		console.log(err);
	// 	});
	//
	// 	this.allocations.getAllocationsCount().then(function(count) {
	// 		show("allocations-count", count.valueOf());
	// 	}).catch(function(err) {
	// 		console.log(err);
	// 	});
	//},

	/*addAllocation: function() {
		var self = this;
		var address = document.getElementById("allocation-address").value;
		var value = etherToWei(document.getElementById("allocation-value").value);
		var vestingValue = etherToWei(document.getElementById("allocation-vesting-value").value);
		var vestingCliff = duration.days(document.getElementById("allocation-vesting-cliff").value);
		var vestingPeriod = duration.days(document.getElementById("allocation-vesting-period").value);
		console.log("Adding allocation: " + address);
		self.setAlert("Adding allocation...");
		self.allocations.registerAllocation(address, value, vestingValue, vestingCliff, vestingPeriod, {from: adminAccount, gas: 200000}).then(function(tx) {
			self.setAllocationsSummary();
			self.listAllAllocations();
			self.setAlert("Allocation was added. Transaction hash: " + tx.tx, "success");
		}).catch(function(err) {
			Dapp.throwError("Cannot add allocation!");
			console.log(err);
		});
	},

	findAllocation: function() {
		var self = this;
		var address = document.getElementById("allocation-address").value;
		console.log("Checking address: " + address);
		self.setAlert("Looking for allocation: " + address);
			self.allocations.getAllocation(address, {from: adminAccount}).then(function(result) {
			console.log(result);
			if (result && result[0].valueOf()>0) {
				self.setAlert("Address: " + address + " has an allocation.", "success");
				document.getElementById("allocation-value").value = weiToEther(result[0].valueOf());
				document.getElementById("allocation-vesting-value").value = weiToEther(result[1].valueOf());
				document.getElementById("allocation-vesting-cliff").value = result[2].valueOf() / duration.days(1);
				document.getElementById("allocation-vesting-period").value = result[3].valueOf() / duration.days(1);
				show("add-update-button", "Update");
			} else {
				self.setAlert("Address: " + address + " has NO allocation.", "danger");
			}
		}).catch(function(err) {
			Dapp.throwError("Cannot check the address!");
			console.log(err);
		});
	},

	fetchAllocation: function(index, max, table) {
		var self = this;
		var address;

		if (index<max) {
			return self.allocations.getAllocationAddress(index).then(function (value) {
				address = value;
				return self.allocations.getAllocation(address).then(function (allocation) {
					var row = table.insertRow();
					row.insertCell(0).innerHTML = index;
					row.insertCell(1).innerHTML = address;
					row.insertCell(2).innerHTML = weiToEther(allocation[0]);
					row.insertCell(3).innerHTML = weiToEther(allocation[1]);
					row.insertCell(4).innerHTML = allocation[2].valueOf() / duration.days(1);
					row.insertCell(5).innerHTML = allocation[3].valueOf() / duration.days(1);
					return self.fetchAllocation(index+1, max, table);
				});
			}).catch(function(err) {
				console.log(err);
			});
		}
	},

	listAllAllocations: function() {
		var self = this;
		var table = document.getElementById("allocations-table");
		while (table.rows.length> 1) {
			table.deleteRow(1);
		}
		self.allocations.getAllocationsCount().then(function(max) {
			return self.fetchAllocation(0, max.toNumber(), table);
		}).catch(function(err) {
			console.log(err);
		});
	},

	removeAllocation: function() {
		var self = this;
		var address = document.getElementById("allocation-remove-address").value;
		self.setAlert("Removing the allocation " + address);
		self.allocations.removeAllocation(address, {from: adminAccount}).then(function(tx) {
			console.log(tx);
			self.setAllocationsSummary();
			self.listAllAllocations();
			self.setAlert("Allocation was removed. Transaction hash: " + tx.tx, "success");
		}).catch(function(err) {
			Dapp.throwError("Cannot remove the allocation!");
			console.log(err);
		});
	},*/


};

window.addEventListener("load", function() {
	//TODO: Connect to inected web3 once deployed on testnet

	// if (typeof web3 !== "undefined") {
	// 	window.web3 = new Web3(web3.currentProvider);
	// } else {
	// 	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	// }

	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

	UserFactory.setProvider(web3.currentProvider);
	AkropolisToken.setProvider(web3.currentProvider);
	UserRegistry.setProvider(web3.currentProvider);

	web3.eth.getAccounts(function(err, accounts) {
		if (err) {
			Dapp.throwError("Your browser can't see the decentralized web!", err);
		}
		if (accounts.length == 0) {
			Dapp.throwError("Connect an account!");
		}

		mainAccount = accounts[0];
		networkId = web3.version.network;

		console.log("Main account: " + mainAccount);

	});
});