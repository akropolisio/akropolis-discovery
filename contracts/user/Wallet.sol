pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../network/FundManagerRegistry.sol';
import '../oracle/PaymentGateway.sol';
import '../fund/FundManager.sol';
import '../user/SavingsAccount.sol';
import '../tokens/AkropolisExternalToken.sol';
import '../tokens/AkropolisInternalToken.sol';

contract Wallet is Ownable {
    using SafeMath for uint256;

    FundManagerRegistry public registry;
    PaymentGateway public paymentGateway;
    AkropolisInternalToken public ait;

    function Wallet(FundManagerRegistry _pensionFundsRegistry, PaymentGateway _paymentGateway) public {
        registry = _pensionFundsRegistry;
        paymentGateway = _paymentGateway;
        ait = paymentGateway.ait();
    }

    function invest(bytes32 _fundName, uint _amount, SavingsAccount _account) public onlyOwner {
        FundManager fund = registry.getFund(_fundName);
        require(address(fund) != 0x0);

        ait.approve(address(fund), _amount);
        FeesCollector feesCollector = fund.feesCollector();
        AkropolisExternalToken aet = fund.aet();
        uint256 fee = feesCollector.calculateInvestmentFee(ait, _amount);
        aet.approve(feesCollector, fee);

        fund.investFromUser(ait, _amount, _account);
    }

    function refund(ERC20 _token, uint _amount) public onlyOwner {
        _token.transfer(owner, _amount);
    }

    function balance(ERC20 _token) public view returns(uint256){
        return _token.balanceOf(this);
    }

    function makeDeposit(uint256 _value) public onlyOwner {
        paymentGateway.depositToWallet(_value);
    }

}