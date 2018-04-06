const PersonalDataOracle = artifacts.require('./PersonalDataOracle.sol');

module.exports = async function(deployer) {
	await deployer.deploy(PersonalDataOracle);
};
