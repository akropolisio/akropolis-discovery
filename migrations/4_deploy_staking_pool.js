const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');

module.exports = async function(deployer) {
	await deployer.deploy(StakingPool, AkropolisToken.address);
};
