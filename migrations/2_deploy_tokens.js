const AkropolisToken = artifacts.require('./AkropolisToken.sol');


module.exports = async function(deployer) {
	await deployer.deploy(AkropolisToken);
	process.deployment = {"AkropolisToken" : AkropolisToken.address};
};
