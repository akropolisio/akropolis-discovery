pragma solidity ^0.4.0;
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract SavingGoal is Ownable {
    uint256 public age;
    uint256 public monthlyIncome;

    function SavingGoal(uint256 _age, uint256 _monthlyIncome) public {
        age = _age;
        monthlyIncome = _monthlyIncome;
    }
}
