const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');
const StakingPool = artifacts.require('./StakingPool.sol');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');

module.exports = async function(deployer) {
	await deployer.deploy(UserRegistry);
	await deployer.deploy(StakingPool);
	await deployer.deploy(PensionFundsRegistry, StakingPool.address);
};
