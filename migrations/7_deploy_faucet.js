const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');
const AETFaucet = artifacts.require('./AETFaucet.sol');

module.exports = function(deployer) {
	console.log("Connecting AETFaucet to AET: " + AkropolisExternalToken.address);
	deployer.deploy(AETFaucet, AkropolisExternalToken.address);
	deployer.then(function() {
		return AkropolisExternalToken.at(AkropolisExternalToken.address);
	}).then(function(instance) {
		return instance.mint(AETFaucet.address, web3.toWei(1000000, "ether"));
	}).then(function(tx) {
		console.log("Faucet funding tx: " + tx.tx);
		process.deployment.AETFaucet = AETFaucet.address;
	});


};
