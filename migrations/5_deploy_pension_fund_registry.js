const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');

module.exports = function(deployer) {
	console.log("Connecting Pension Registry to AET: " + AkropolisToken.address);
	console.log("Connecting Pension Registry to Staking Pool: " + StakingPool.address);
	deployer.deploy(PensionFundsRegistry, AkropolisToken.address, StakingPool.address);
	deployer.then(function() {
		return PensionFundsRegistry.deployed();
	}).then(function(instance) {
		return instance.setMinStake(web3.toWei(100, "ether"));
	});
};
