pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../network/PensionFundsRegistry.sol';
import '../oracle/PaymentGateway.sol';
import '../fund/PensionFund.sol';
import '../user/SavingsAccount.sol';
import '../tokens/AkropolisToken.sol';

contract Wallet is Ownable {
    using SafeMath for uint256;

    PensionFundsRegistry registry;
    PaymentGateway paymentGateway;
    DigitalUSD public usdToken;

    function Wallet(PensionFundsRegistry _pensionFundsRegistry, PaymentGateway _paymentGateway) public {
        registry = _pensionFundsRegistry;
        paymentGateway = _paymentGateway;
        usdToken = paymentGateway.usdToken();
    }

    function invest(bytes32 _fundName, uint _amount, SavingsAccount _account) public onlyOwner {
        PensionFund fund = registry.getFund(_fundName);
        require(address(fund) != 0x0);

        usdToken.approve(address(fund), _amount);
        FeesCollector feesCollector = fund.feesCollector();
        AkropolisToken aet = fund.aet();
        uint256 fee = feesCollector.calculateInvestmentFee(usdToken, _amount);
        aet.approve(feesCollector, fee);

        fund.investFromUser(usdToken, _amount, _account);
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