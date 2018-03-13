const PaymentGateway = artifacts.require('./PaymentGateway.sol');

module.exports = async function(deployer, network) {
	await deployer.deploy(PaymentGateway);
};
