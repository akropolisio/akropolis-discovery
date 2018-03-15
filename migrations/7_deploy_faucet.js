const fs = require('fs');

const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const AETFaucet = artifacts.require('./AETFaucet.sol');

module.exports = function(deployer) {
	deployer.deploy(AETFaucet, AkropolisToken.address);
	deployer.then(function() {
		return AkropolisToken.deployed();
	}).then(function(instance) {
		return instance.mint(AETFaucet.address, web3.toWei(1000000, "ether"));

		process.deployment.AETFaucet = AETFaucet.address;
		fs.writeFile('build/deployment.json', JSON.stringify(process.deployment), 'utf8', function(err) {
			if (err) console.log("Error while writing deployment addresses: " + err);
		});
	});


};
