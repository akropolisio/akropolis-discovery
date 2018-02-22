pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../tokens/AkropolisToken.sol';
import '../network/PensionFundsRegistry.sol';
import '../network/StakingPool.sol';
import './FeesCollector.sol';


/**
 * @title PensionFund
 * @dev Pension funds that manages users deposits
 */
contract PensionFund is Ownable {

    AkropolisToken public akropolisToken;
    FeesCollector public feesCollector;


    function PensionFund(AkropolisToken _akropolisToken) public {
        akropolisToken = _akropolisToken;
    }


    function investFromUser(ERC20 _token, uint256 _amount) public {
        _token.transferFrom(msg.sender, address(this), _amount);
        feesCollector.collectInvestmentFee(msg.sender, _token, _amount);
    }


    function stake(StakingPool _stakingPool, uint256 _amount) onlyOwner public {
        akropolisToken.approve(_stakingPool, _amount);
        _stakingPool.stake(_amount);
    }


    function withdrawStake(StakingPool _stakingPool) onlyOwner public {
        _stakingPool.withdrawStake();
    }


    function register(PensionFundsRegistry _registry, bytes32 _name) onlyOwner public {
        _registry.register(_name);
    }


    function unregister(PensionFundsRegistry _registry, bytes32 _name) onlyOwner public {
        _registry.unregister(_name);
    }


    function setFeesCollector(FeesCollector _feesCollector) onlyOwner public {
        feesCollector = _feesCollector;
    }

}