const ComplianceOracle = artifacts.require('./ComplianceOracle');

module.exports = async function(deployer) {
	await deployer.deploy(ComplianceOracle);
};
