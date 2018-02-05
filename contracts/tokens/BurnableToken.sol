pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/BasicToken.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

/**
 * @title Burnable Token
 * @dev Token that can be irreversibly burned (destroyed).
 * Token may be burned only by the owner
 */
contract BurnableToken is BasicToken, Ownable {

    event Burn(address indexed burner, uint256 value);

    /**
     * @dev Burns a specific amount of tokens.
     * @param _value The amount of token to be burned.
     */
    function burn(address _holder, uint256 _value) onlyOwner public {
        require(_value <= balances[_holder]);

        balances[_holder] = balances[_holder].sub(_value);
        totalSupply = totalSupply.sub(_value);
        Burn(_holder, _value);
    }
}
