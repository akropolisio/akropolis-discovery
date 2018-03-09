const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const AETFaucet = artifacts.require('./AETFaucet.sol');

module.exports = async function(deployer) {
	var token = await AkropolisToken.deployed();
	await deployer.deploy(AETFaucet, AkropolisToken.address);
	await token.mint(AETFaucet.address, web3.toWei(1000000, "ether"));
	var faucet = await AETFaucet.deployed();
	console.log(faucet.address);

	console.log(AETFaucet.address);
	var b = await token.balanceOf(AETFaucet.address);
	console.log(b);
};
