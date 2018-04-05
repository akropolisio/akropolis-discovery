pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';


/**
 * @title ComplianceOracle
 * @dev Contract is responsible for verification of FundManagers and controls granting licenses
 */
contract ComplianceOracle is Ownable {

    event StatusChanged(bytes32 fundName, LicenseStatus status);

    enum LicenseStatus {PENDING, APPROVED, REJECTED}

    struct License {
        address fundAddress;
        LicenseStatus status;
    }

    mapping(bytes32 => License) public licenses;


    function applyForLicense(bytes32 _fundName, address _fundAddress) public {
        licenses[_fundName] = License(_fundAddress, LicenseStatus.PENDING);
        StatusChanged(_fundName, LicenseStatus.PENDING);
    }

    function approveLicense(bytes32 _fundName) public onlyOwner {
        licenses[_fundName].status = LicenseStatus.APPROVED;
        StatusChanged(_fundName, LicenseStatus.APPROVED);
    }

    function rejectLicense(bytes32 _fundName, address _fundAddress) public onlyOwner {
        licenses[_fundName].status = LicenseStatus.REJECTED;
        StatusChanged(_fundName, LicenseStatus.REJECTED);
    }

    function hasLicense(bytes32 _fundName) public view returns(bool) {
        return (licenses[_fundName].status == LicenseStatus.APPROVED);
    }





}