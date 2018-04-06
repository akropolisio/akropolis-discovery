const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');


module.exports = async function(deployer) {
	await deployer.deploy(AkropolisExternalToken);
	process.deployment = {"AkropolisExternalToken" : AkropolisExternalToken.address};
};
