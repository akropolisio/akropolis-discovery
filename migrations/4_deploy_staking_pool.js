const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');

module.exports = async function(deployer) {
	console.log("Connecting Staking pool to AET: " + AkropolisToken.address);
	await deployer.deploy(StakingPool, AkropolisToken.address);
};
