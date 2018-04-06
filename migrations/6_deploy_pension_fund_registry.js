const FundManagerRegistry = artifacts.require('./FundManagerRegistry.sol');
const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');
const ComplianceOracle = artifacts.require('./ComplianceOracle.sol');

module.exports = function(deployer) {
	console.log("Connecting Pension Registry to AET: " + AkropolisExternalToken.address);
	console.log("Connecting Pension Registry to Staking Pool: " + StakingPool.address);
	console.log("Connecting Pension Registry to Compliance Oracle: " + ComplianceOracle.address);
	deployer.deploy(FundManagerRegistry, AkropolisExternalToken.address, StakingPool.address, ComplianceOracle.address);
	deployer.then(function() {
		return FundManagerRegistry.deployed();
	}).then(function(instance) {
		return instance.setMinStake(web3.toWei(100, "ether"));
	});
};
