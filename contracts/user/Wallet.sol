pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../network/PensionFundsRegistry.sol';
import '../fund/PensionFund.sol';

contract Wallet is Ownable {
    using SafeMath for uint256;

    PensionFundsRegistry registry;

    function Wallet(PensionFundsRegistry _pensionFundsRegistry) public {
        registry = _pensionFundsRegistry;
    }

    function invest(bytes32 _fundName, ERC20 _token, uint _amount) public onlyOwner {
        PensionFund fund = registry.getFund(_fundName);
        require(address(fund) != 0x0);
        _token.approve(address(fund), _amount);
        fund.investFromUser(_token, _amount);
    }

    function refund(ERC20 _token, uint _amount) public onlyOwner {
        _token.transfer(owner, _amount);
    }

    function balance(ERC20 _token) public view returns(uint256){
        return _token.balanceOf(this);
    }

}