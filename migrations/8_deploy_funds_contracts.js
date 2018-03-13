const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');

module.exports = async function(deployer, network, [main, fundsOwner]) {
	var registry = await PensionFundsRegistry.deployed();
	var aet = await AkropolisToken.deployed();

	await aet.mint(fundsOwner, web3.toWei(400, "ether"), {from: main});
	await aet.approve(registry.address, web3.toWei(400, "ether"), {from: fundsOwner});

	await registry.createAndRegisterPensionFund("TECH", {from: fundsOwner});
	await registry.createAndRegisterPensionFund("SUSTAINABLE", {from: fundsOwner});
	await registry.createAndRegisterPensionFund("BIOMED", {from: fundsOwner});
	await registry.createAndRegisterPensionFund("ENERGY", {from: fundsOwner});
};
