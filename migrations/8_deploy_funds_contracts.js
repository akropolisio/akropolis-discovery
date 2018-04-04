const FundManagerRegistry = artifacts.require('./FundManagerRegistry.sol');
const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');

module.exports = function(deployer, network, [main]) {
	var registry,aet;
	deployer.then(function() {
		return FundManagerRegistry.deployed();
	}).then(function(instance) {
		registry = instance;
		return AkropolisExternalToken.deployed();
	}).then(function(instance) {
		aet = instance;
		return aet.mint(main, web3.toWei(400, "ether"));
	}).then(function() {
		return aet.approve(registry.address, web3.toWei(400, "ether"), {from: main});
	}).then(function() {
		return registry.createAndRegisterFundManager("TECH", {from: main});
	}).then(function() {
		return registry.createAndRegisterFundManager("SUSTAINABLE", {from: main});
	}).then(function() {
		return registry.createAndRegisterFundManager("BIOMED", {from: main});
	}).then(function() {
		return registry.createAndRegisterFundManager("ENERGY", {from: main});
	})
};
