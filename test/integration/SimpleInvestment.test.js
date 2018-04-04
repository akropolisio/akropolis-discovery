'use strict'

const Moment = require('moment');

const User = artifacts.require('./User.sol');
const UserRegistry = artifacts.require('./UserRegistry.sol');
const FundRegistry = artifacts.require('./FundManagerRegistry.sol');
const FundManager = artifacts.require('./FundManager.sol');
const PaymentGateway = artifacts.require('./PaymentGateway.sol');
const AkropolisExternalToken = artifacts.require('./AkropolisExternalToken.sol');
const Wallet = artifacts.require('./Wallet.sol');
const SavingsAccount = artifacts.require('./SavingsAccount.sol');
const AkropolisInternalToken = artifacts.require('./AkropolisInternalToken.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Simple Investment Scenario', function ([owner, userAccount, fundAccount]) {

	const DOB = Moment("1983-09-19");

	let userRegistry, user, fundRegistry, fund, aet, ait, savingsAccount;

	before(async function () {
		userRegistry = await UserRegistry.deployed();
		fundRegistry = await FundRegistry.deployed();
		aet = await AkropolisExternalToken.deployed();
		var paymentGateway = await PaymentGateway.deployed();
		ait = AkropolisInternalToken.at(await paymentGateway.ait());
	});


	it('should create a user', async function () {
		await userRegistry.createUser(DOB.unix(), 65, 2200, {from: userAccount});
		user = User.at(await userRegistry.getUserContract(userAccount));
		var walletAddress = await user.wallet();
		await aet.mint(walletAddress, web3.toWei(100, "ether"), {from: owner});
		await user.createDefaultAccounts({from: userAccount});
		savingsAccount = SavingsAccount.at(await user.getSavingAccountByName("VOLUNTARY"));

		(await user.dateOfBirth()).should.be.bignumber.equal(DOB.unix());
		(await user.owner()).should.be.equal(userAccount);
		(await user.getSavingAccountsCount()).should.be.bignumber.equal(3);
	});


	it('should create a pension fund', async function () {
		await aet.mint(fundAccount, web3.toWei(100, "ether"), {from: owner});
		await aet.approve(fundRegistry.address, web3.toWei(100, "ether"), {from: fundAccount});
		await fundRegistry.createAndRegisterFundManager("FUND", {from: fundAccount});
		fund = FundManager.at(await fundRegistry.getFund("FUND"));

		(await fund.owner()).should.be.equal(fundAccount);
	});


	it('should invest and get shares', async function () {
		var wallet = Wallet.at(await user.wallet());
		(await wallet.balance(aet.address)).should.be.bignumber.equal(web3.toWei(100, "ether"));

		await user.investIntoFund("FUND", 100, "VOLUNTARY", {from: userAccount});

		(await wallet.balance(aet.address)).should.be.bignumber.equal(web3.toWei(99, "ether"));
		(await savingsAccount.totalValue(ait.address)).should.be.bignumber.equal(100);
		(await user.getSavingAccountValue("VOLUNTARY")).should.be.bignumber.equal(100);
	});


});