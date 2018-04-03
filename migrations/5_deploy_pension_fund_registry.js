const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');

module.exports = function(deployer) {
	console.log("Connecting Pension Registry to AET: " + AkropolisExternalToken.address);
	console.log("Connecting Pension Registry to Staking Pool: " + StakingPool.address);
	deployer.deploy(PensionFundsRegistry, AkropolisExternalToken.address, StakingPool.address);
	deployer.then(function() {
		return PensionFundsRegistry.deployed();
	}).then(function(instance) {
		return instance.setMinStake(web3.toWei(100, "ether"));
	});
};
