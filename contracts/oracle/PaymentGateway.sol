pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../tokens/DigitalUSD.sol';
import '../user/Wallet.sol';

contract PaymentGateway is Ownable {
    using SafeMath for uint256;

    DigitalUSD public usdToken;

    function PaymentGateway() public {
        usdToken = new DigitalUSD();
    }

    //In the full version payment will need to be proxied through banking oracle
    function depositToWallet(uint256 value) public {
        usdToken.mint(msg.sender, value);
    }

    function refund(ERC20 _token, uint _amount) public onlyOwner {
        _token.transfer(owner, _amount);
    }

    function balance(ERC20 _token) public view returns(uint256){
        return _token.balanceOf(this);
    }

}