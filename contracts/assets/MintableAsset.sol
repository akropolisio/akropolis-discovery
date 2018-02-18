pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import './Asset.sol';


/**
 * @title MintableAsset
 * @dev Base asset class with ability to mint additional amount by owner
 */
contract MintableAsset is Asset, MintableToken {

}