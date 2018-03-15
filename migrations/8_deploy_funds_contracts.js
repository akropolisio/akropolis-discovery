const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');

module.exports = function(deployer, network, [main]) {
	var registry,aet;
	deployer.then(function() {
		return PensionFundsRegistry.deployed();
	}).then(function(instance) {
		registry = instance;
		return AkropolisToken.deployed();
	}).then(function(instance) {
		aet = instance;
		return aet.mint(main, web3.toWei(400, "ether"));
	}).then(function() {
		return aet.approve(registry.address, web3.toWei(400, "ether"), {from: main});
	}).then(function() {
		return registry.createAndRegisterPensionFund("TECH", {from: main});
	}).then(function() {
		registry.createAndRegisterPensionFund("SUSTAINABLE", {from: main});
	}).then(function() {
		registry.createAndRegisterPensionFund("BIOMED", {from: main});
	}).then(function() {
		registry.createAndRegisterPensionFund("ENERGY", {from: main});
	})
};
