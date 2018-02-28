const AkropolisToken = artifacts.require('./AkropolisToken.sol')
const DigitalUSD = artifacts.require('./AkropolisToken.sol')

module.exports = function(deployer) {
	deployer.deploy(AkropolisToken);
	deployer.deploy(DigitalUSD);
};
