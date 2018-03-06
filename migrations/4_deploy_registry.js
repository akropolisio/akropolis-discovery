const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const StakingPool = artifacts.require('./StakingPool.sol');

module.exports = async function(deployer) {
	await deployer.deploy(PensionFundsRegistry, StakingPool.address);
};
