pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../tokens/AkropolisToken.sol';
import '../network/PensionFundsRegistry.sol';
import '../network/StakingPool.sol';
import '../assets/Shares.sol';


/**
 * @title PensionFund
 * @dev Pension funds that manages users deposits
 */
contract PensionFund is Ownable {

    AkropolisToken public akropolisToken;
    Shares public fundShares;


    function PensionFund(AkropolisToken _akropolisToken, bytes32 _symbol) public {
        akropolisToken = _akropolisToken;
        fundShares = new Shares(_symbol);
    }


    function investFromUser(ERC20 _token, uint256 _amount) public {
        _token.transferFrom(msg.sender, address(this), _amount);
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

}