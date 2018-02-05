pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

/**
 * @title DigitalUSD
 * @dev Implementing a stable coin pegged one-to-one with USD
 * The detailed mechanism of tokenisation and reserve keeping needs to be
 * fine tuned based on regulatory feedback.
 */
contract DigitalUSD is MintableToken {

    string public name = "Digital USD";

    uint8 public decimals = 18;

    string public symbol = "dUSD";

    string public version = 'dUSD 1.0';
}