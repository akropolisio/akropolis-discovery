pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

/**
 * @title Burnable Token
 * @dev Token that can be irreversibly burned (destroyed).
 * Token may be burned only by the owner
 */
contract StakingPool is Ownable {
    using SafeMath for uint256;

    event Stake(address indexed from, uint256 value);
    event WithdrawStake(address indexed to, uint256 value);

    ERC20 public token;
    mapping(address => uint256) public stakes;

    function StakingPool(ERC20 _token) public {
        token = _token;
    }


    /**
    * Allows an account to lock a stake in this contract
    */
    function stake(uint _value) public {
        require(token.transferFrom(msg.sender, address(this), _value));
        stakes[msg.sender] = stakes[msg.sender].add(_value);
        Stake(msg.sender, _value);
    }


    /**
    * Allows an account to withdraw the full value of it's stake
    */
    function withdrawStake() public {
        uint256 amount = stakes[msg.sender];
        require(amount > 0);
        require(token.transfer(msg.sender, amount));
        stakes[msg.sender] = 0;
        WithdrawStake(msg.sender, amount);
    }


    /**
    * Returns the stake locked by an given address
    */
    function getStake(address _address) view public returns(uint256) {
        return stakes[_address];
    }

}
