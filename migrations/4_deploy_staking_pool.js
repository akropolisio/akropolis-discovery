const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');

module.exports = async function(deployer) {
	console.log("Connecting Staking pool to AET: " + AkropolisExternalToken.address);
	await deployer.deploy(StakingPool, AkropolisExternalToken.address);
};
