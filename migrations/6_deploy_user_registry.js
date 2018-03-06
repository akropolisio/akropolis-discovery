const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const PaymentGateway = artifacts.require('./PaymentGateway.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');


module.exports = async function(deployer, network) {
	await deployer.deploy(UserRegistry, PensionFundsRegistry.address, PaymentGateway.address);
};
