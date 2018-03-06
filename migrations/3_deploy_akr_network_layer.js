const StakingPool = artifacts.require('./StakingPool.sol');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const PaymentGateway = artifacts.require('./PaymentGateway.sol');


module.exports = async function(deployer, network) {
	await deployer.deploy(PaymentGateway);
	await deployer.deploy(StakingPool, AkropolisToken.address);
};
