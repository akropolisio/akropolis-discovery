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

    mapping(bytes32 => PensionFund) shares;

    function SavingsAccount(PensionFundsRegistry _pensionFundsRegistry) public {
        registry = _pensionFundsRegistry;
    }

    function balanceOfFund(bytes32 _fundName) public view returns(uint256) {
        return 0;
    }

    function valueOfFund(bytes32 _fundName) public view returns(uint256) {
        return 0;
    }

    function addFund(bytes32 _fundName) public onlyOwner {

    }

    function removeFund(bytes32 _fundName) public onlyOwner {

    }

}