'use strict'

const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const StakingPool = artifacts.require('./StakingPool.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Akropolis Token', function ([owner, staker]) {

	let token, pool;

	before(async function () {
		token = await AkropolisToken.new();
		pool = await StakingPool.new(token.address);
		await token.mint(staker, 100, {from: owner});
		(await token.balanceOf(staker)).should.be.bignumber.equal(100);
	});



	it('should allow staking', async function () {
		await token.approve(pool.address, 50, {from: staker});
		await pool.stake(50, {from: staker});

		(await token.balanceOf(pool.address)).should.be.bignumber.equal(50);
		(await pool.getStake(staker)).should.be.bignumber.equal(50);
	});


	it('should allow adding more to stake', async function () {
		await token.approve(pool.address, 20, {from: staker});
		await pool.stake(20, {from: staker});

		(await token.balanceOf(pool.address)).should.be.bignumber.equal(70);
		(await pool.getStake(staker)).should.be.bignumber.equal(70);
	});


	it('should allow withdrawing stake', async function () {
		await pool.withdrawStake({from: staker});

		(await token.balanceOf(pool.address)).should.be.bignumber.equal(0);
		(await token.balanceOf(staker)).should.be.bignumber.equal(100);
		(await pool.getStake(staker)).should.be.bignumber.equal(0);
	});

});