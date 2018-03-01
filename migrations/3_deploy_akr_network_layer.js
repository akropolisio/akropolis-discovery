const PensionFundsRegistry = artifacts.require('./PensionFundsRegistry.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');
const StakingPool = artifacts.require('./StakingPool.sol');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const PaymentGateway = artifacts.require('./PaymentGateway.sol');
const UserFactory = artifacts.require('./UserFactory.sol');

module.exports = async function(deployer) {
	await deployer.deploy(StakingPool);
	await deployer.deploy(PaymentGateway);
	await deployer.deploy(PensionFundsRegistry, StakingPool.address);
	await deployer.deploy(UserFactory, PensionFundsRegistry.address, PaymentGateway.address);
};
