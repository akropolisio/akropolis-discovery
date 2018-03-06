const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const AETFaucet = artifacts.require('./AETFaucet.sol');

module.exports = async function(deployer) {
	await deployer.deploy(AETFaucet, AkropolisToken.address);

};
