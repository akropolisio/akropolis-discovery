pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import './BurnableToken.sol';

/**
 * @title AkropolisInternalToken
 * @dev Implementing a stable coin pegged one-to-one with a Fiat Currency
 * The detailed mechanism of tokenization and reserve keeping needs to be
 * fine tuned based on regulatory feedback.
 */
contract AkropolisInternalToken is MintableToken, BurnableToken {

    string public name = "Akropolis Internal Token";

    uint8 public decimals = 2;

    string public symbol = "AIT";

    string public version = 'AIT 1.0';
}