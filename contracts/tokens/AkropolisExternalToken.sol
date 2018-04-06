/*
Implements ERC 20 Token standard: https://github.com/ethereum/EIPs/issues/20
*/

pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract AkropolisExternalToken is MintableToken {

    string public name = "Akropolis External Token";

    uint8 public decimals = 18;

    string public symbol = "AET";

    string public version = 'AET 1.0';
}