pragma solidity ^0.4.18;

import './StakingPool.sol';
import '../fund/FundManager.sol';
import '../fund/FlatFeesCollector.sol';
import '../fund/FundManagerFactory.sol';

/**
 * @title Pension Funds Registry
 * @dev Registry that keeps reference to verified pension funds.
 * It demands a fund to stake certain amount of tokens to be listed.
 * Token may be burned only by the owner
 */
contract FundManagerRegistry is Ownable, FundManagerFactory {

    event Register(address indexed fundAddress, string name);
    event Unregister(address indexed fundAddress, string name);
    event MinStakeUpdated(uint256 stakeAmount);

    StakingPool public stakingPool;
    AkropolisExternalToken public aet;

    uint256 public minStake;
    mapping(bytes32 => FundManager) registry;

    function FundManagerRegistry(AkropolisExternalToken _aet, StakingPool _stakingPool) public
        FundManagerFactory(_aet) {
        aet = _aet;
        stakingPool = _stakingPool;
    }


    function setMinStake(uint256 _minStake) onlyOwner public {
        minStake = _minStake;
        MinStakeUpdated(minStake);
    }


    function register(bytes32 _name) public {
        require(address(registry[_name]) == 0x0);
        require(stakingPool.getStake(msg.sender) >= minStake);
        registry[_name] = FundManager(msg.sender);
    }


    function register(bytes32 _name, FundManager fund) public {
        require(address(registry[_name]) == 0x0);
        require(stakingPool.getStake(fund) >= minStake);
        registry[_name] = fund;
    }


    function unregister(bytes32 _name) public {
        require(address(registry[_name]) != 0x0);
        require(msg.sender == owner || msg.sender == address(registry[_name]));
        delete registry[_name];
    }


    function getFund(bytes32 _name) view public returns(FundManager) {
        return registry[_name];
    }


    function createAndRegisterFundManager(bytes32 _symbol) public returns(FundManager) {
        FundManager fund = super.createFundManager(_symbol);
        aet.transferFrom(msg.sender, fund, minStake);
        fund.stake(stakingPool, minStake);
        register(_symbol, fund);
        fund.transferOwnership(msg.sender);
        return fund;
    }

}
