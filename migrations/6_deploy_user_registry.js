const FundManagerRegistry = artifacts.require('./FundManagerRegistry.sol');
const PaymentGateway = artifacts.require('./PaymentGateway.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');


module.exports = async function(deployer, network) {
	console.log("Connecting UserRegistry to FundManagerRegistry: " + FundManagerRegistry.address);
	console.log("Connecting UserRegistry to PaymentGateway: " + PaymentGateway.address);
	await deployer.deploy(UserRegistry, FundManagerRegistry.address, PaymentGateway.address);
	process.deployment.UserRegistry = UserRegistry.address;
};
