const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const DigitalUSD = artifacts.require('./DigitalUSD.sol');


module.exports = function(deployer) {
	deployer.deploy(AkropolisToken);
	deployer.deploy(DigitalUSD);
};
