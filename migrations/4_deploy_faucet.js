const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const AETFaucet = artifacts.require('./AETFaucet.sol');

module.exports = async function(deployer) {
	var AET = await AkropolisToken.deployed();
	await deployer.deploy(AETFaucet, AET.address);
	await AET.mint(AETFaucet.address, web3.toWei(1000000, "ether"));
	var balance = await AET.balanceOf(AETFaucet.address);
	var faucet = await AETFaucet.deployed();
	var connected = await faucet.aet();
	console.log("Balance: " + balance);
	console.log("AET: " + AET.address);
	console.log("Connected: " + connected);
};
