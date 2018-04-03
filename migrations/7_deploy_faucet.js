const fs = require('fs');

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
		fs.writeFile('build/deployment.json', JSON.stringify(process.deployment), 'utf8', function(err) {
			if (err) console.log("Error while writing deployment addresses: " + err);
		});
	});


};
