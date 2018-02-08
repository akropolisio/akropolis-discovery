pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../tokens/AkropolisToken.sol';
import '../network/PensionFundsRegistry.sol';
import '../network/StakingPool.sol';


/**
 * @title PensionFund
 * @dev Pension funds that manages users deposits
 */
contract PensionFund is Ownable {

    AkropolisToken public akropolisToken;


    function PensionFund(AkropolisToken _akropolisToken) {
        akropolisToken = _akropolisToken;
    }


    function stake(StakingPool _stakingPool, uint256 _amount) onlyOwner {
        akropolisToken.approve(_stakingPool, _amount);
        _stakingPool.stake(_amount);
    }


    function withdrawStake(StakingPool _stakingPool) onlyOwner {
        _stakingPool.withdrawStake();
    }


    function register(PensionFundsRegistry _registry, bytes32 _name) onlyOwner {
        _registry.register(_name);
    }


    function unregister(PensionFundsRegistry _registry, bytes32 _name) onlyOwner {
        _registry.unregister(_name);
    }

}