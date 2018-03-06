pragma solidity ^0.4.18;

import './StakingPool.sol';
import '../fund/PensionFund.sol';
import '../fund/FlatFeesCollector.sol';
import '../fund/PensionFundFactory.sol';

/**
 * @title Pension Funds Registry
 * @dev Registry that keeps reference to verified pension funds.
 * It demands a fund to stake certain amount of tokens to be listed.
 * Token may be burned only by the owner
 */
contract PensionFundsRegistry is Ownable, PensionFundFactory {

    event Register(address indexed fundAddress, string name);
    event Unregister(address indexed fundAddress, string name);
    event MinStakeUpdated(uint256 stakeAmount);

    StakingPool public stakingPool;
    AkropolisToken public aet;

    uint256 public minStake;
    mapping(bytes32 => PensionFund) registry;

    function PensionFundsRegistry(AkropolisToken _aet, StakingPool _stakingPool) public
        PensionFundFactory(_aet) {
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
        registry[_name] = PensionFund(msg.sender);
    }


    function register(bytes32 _name, PensionFund fund) public {
        require(address(registry[_name]) == 0x0);
        require(stakingPool.getStake(fund) >= minStake);
        registry[_name] = fund;
    }


    function unregister(bytes32 _name) public {
        require(address(registry[_name]) != 0x0);
        require(msg.sender == owner || msg.sender == address(registry[_name]));
        delete registry[_name];
    }


    function getFund(bytes32 _name) view public returns(PensionFund) {
        return registry[_name];
    }


    function createAndRegisterPensionFund(bytes32 _symbol) public returns(PensionFund) {
        PensionFund fund = super.createPensionFund(_symbol);
        aet.transferFrom(msg.sender, fund, minStake);
        fund.stake(stakingPool, minStake);
        register(_symbol, fund);
        fund.transferOwnership(msg.sender);
        return fund;
    }

}
