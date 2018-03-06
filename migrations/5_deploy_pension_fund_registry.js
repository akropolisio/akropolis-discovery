const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');

module.exports = async function(deployer) {
	await deployer.deploy(PensionFundsRegistry, AkropolisToken.address, StakingPool.address);
	var registry = await PensionFundsRegistry.deployed();
	await registry.setMinStake(100);
};
