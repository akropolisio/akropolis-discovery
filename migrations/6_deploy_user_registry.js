const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const PaymentGateway = artifacts.require('./PaymentGateway.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');


module.exports = async function(deployer, network) {
	console.log("Connecting UserRegistry to PensionFundsRegistry: " + PensionFundsRegistry.address);
	console.log("Connecting UserRegistry to PaymentGateway: " + PaymentGateway.address);
	await deployer.deploy(UserRegistry, PensionFundsRegistry.address, PaymentGateway.address);
	process.deployment.UserRegistry = UserRegistry.address;
};
