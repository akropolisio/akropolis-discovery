pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

import '../tokens/AkropolisToken.sol';
import '../network/PensionFundsRegistry.sol';
import '../network/StakingPool.sol';
import './FlatFeesCollector.sol';
import '../assets/Shares.sol';
import '../user/SavingsAccount.sol';


/**
 * @title PensionFund
 * @dev Pension funds that manages users deposits
 */
contract PensionFund is Ownable, PricingOracle {
    using SafeMath for uint256;

    AkropolisToken public aet;
    FeesCollector public feesCollector;
    Shares public shares;

    uint256 public totalShares;
    bytes32 public symbol;

    function PensionFund(AkropolisToken _aet, bytes32 _symbol) public {
        aet = _aet;
        symbol = _symbol;
        shares = new Shares(symbol, this);
    }


    function investFromUser(ERC20 _token, uint256 _amount, SavingsAccount _savingsAccount) public {
        _token.transferFrom(msg.sender, address(this), _amount);
        feesCollector.collectInvestmentFee(msg.sender, aet, _amount);
        uint256 ratio = getRelativePrice(shares, _token);
        shares.issueShares(_savingsAccount, _amount.mul(ratio));
    }


    function stake(StakingPool _stakingPool, uint256 _amount) onlyOwner public {
        aet.approve(_stakingPool, _amount);
        _stakingPool.stake(_amount);
    }


    function withdrawStake(StakingPool _stakingPool) onlyOwner public {
        _stakingPool.withdrawStake();
    }


    function register(PensionFundsRegistry _registry) onlyOwner public {
        _registry.register(symbol);
    }


    function unregister(PensionFundsRegistry _registry) onlyOwner public {
        _registry.unregister(symbol);
    }


    function setFeesCollector(FeesCollector _feesCollector) onlyOwner public {
        feesCollector = _feesCollector;
    }

    //In a simple model pension fund can act as it's own pricing oracle,
    //in a more complex scenario (audited fund) we can use a separate contract
    function getRelativePrice(Asset _subject, ERC20 _reference) public view returns(uint256) {
        //Forward valuation to assets once the investment module is implemented
        //Deal with calculation precision
        return 1;
    }

    function balanceOf(address _account) view public returns(uint256) {
        return shares.balanceOf(_account);
    }

    function valueOf(address _account, ERC20 _reference) view public returns(uint256) {
        return balanceOf(_account).mul(getRelativePrice(shares, _reference));
    }

}