const fs = require('fs');

const FundManagerRegistry = artifacts.require('./FundManagerRegistry.sol');
const PersonalDataOracle = artifacts.require('./PersonalDataOracle.sol');
const PaymentGateway = artifacts.require('./PaymentGateway.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');


module.exports = async function(deployer, network) {
	console.log("Connecting UserRegistry to FundManagerRegistry: " + FundManagerRegistry.address);
	console.log("Connecting UserRegistry to PaymentGateway: " + PaymentGateway.address);
	console.log("Connecting UserRegistry to PersonalDataOracle: " + PersonalDataOracle.address);
	await deployer.deploy(UserRegistry, FundManagerRegistry.address, PaymentGateway.address, PersonalDataOracle.address);
	process.deployment.UserRegistry = UserRegistry.address;

	fs.writeFile('build/deployment.json', JSON.stringify(process.deployment), 'utf8', function(err) {
		if (err) console.log("Error while writing deployment addresses: " + err);
	});
};
