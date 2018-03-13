pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../network/PensionFundsRegistry.sol';
import '../oracle/PaymentGateway.sol';
import '../fund/PensionFund.sol';

contract SavingsAccount is Ownable {
    using SafeMath for uint256;

    PensionFundsRegistry registry;

    mapping(bytes32 => bool) funds;
    bytes32[] fundsList;

    function SavingsAccount(PensionFundsRegistry _pensionFundsRegistry) public {
        registry = _pensionFundsRegistry;
    }

    function addFund(bytes32 _fundName) public onlyOwner {
        require(fundsList.length < 16);
        if (!funds[_fundName]) {
            funds[_fundName] = true;
            fundsList.push(_fundName);
        }
    }

    function balanceOfFund(bytes32 _fundName) public view returns(uint256) {
        return registry.getFund(_fundName).balanceOf(this);
    }

    function valueOfFund(bytes32 _fundName, ERC20 _reference) public view returns(uint256) {
        return registry.getFund(_fundName).valueOf(this, _reference);
    }

    function totalValue(ERC20 _reference) public view returns(uint256) {
        uint256 total = 0;
        for(uint256 i = 0; i < fundsList.length; i++) {
            total = total.add(valueOfFund(fundsList[i], _reference));
        }
        return total;
    }


}