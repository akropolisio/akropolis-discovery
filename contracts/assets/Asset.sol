pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

/**
 * @title Asset
 * @dev Abstract asset implementation
 */
contract Asset is ERC20, Ownable {

    bytes32 public assetSymbol;

    function symbol() public view returns (bytes32) {
        return assetSymbol;
    }

    function Asset(bytes32 _symbol) public {
        assetSymbol = _symbol;
    }

}