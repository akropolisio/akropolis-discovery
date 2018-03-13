const fs = require('fs');

const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const AETFaucet = artifacts.require('./AETFaucet.sol');

module.exports = async function(deployer) {
	var token = await AkropolisToken.deployed();
	await deployer.deploy(AETFaucet, AkropolisToken.address);
	await token.mint(AETFaucet.address, web3.toWei(1000000, "ether"));
	process.deployment.AETFaucet = AETFaucet.address;

	await fs.writeFile('build/deployment.json', JSON.stringify(process.deployment), 'utf8', function(err) {
		if (err) console.log("Error while writing deployment addresses: " + err);
	});
};
