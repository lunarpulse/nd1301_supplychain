// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// Import the library 'Roles'
import "../Roles.sol";

// Define a contract 'AuditorRole' to manage this role - add, remove, check
contract AuditorRole {
  using Roles for Roles.Role;

  event AuditorAdded(address indexed account);
  event AuditorRemoved(address indexed account);
  // Define a struct 'Auditors' by inheriting from 'Roles' library, struct Role
  Roles.Role private _Auditors;

  // In the constructor make the address that deploys this contract the 1st Auditor
  constructor() public {
    _addAuditor(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyAuditor() {
    require(isAuditor(msg.sender), "AuditorRole : caller does not have the Auditor role");
    _;
  }

  // Define a function 'isAuditor' to check this role
  function isAuditor(address account) public view returns (bool) {
    return _Auditors.has(account);
  }

  // Define a function 'addAuditor' that adds this role
  function addAuditor(address account) public onlyAuditor {
    _addAuditor(account);
  }

  // Define a function 'renounceAuditor' to renounce this role
  function renounceAuditor() public {
    _removeAuditor(msg.sender);
  }

  // Define an internal function '_addAuditor' to add this role, called by 'addAuditor'
  function _addAuditor(address account) internal {
    _Auditors.add(account);
    emit AuditorAdded(account);
  }

  // Define an internal function '_removeAuditor' to remove this role, called by 'removeAuditor'
  function _removeAuditor(address account) internal {
    _Auditors.remove(account);
    emit AuditorRemoved(account);
  }
}