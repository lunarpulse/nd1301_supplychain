// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// Import the library 'Roles'
import "../Roles.sol";

// Define a contract 'EndUserRole' to manage this role - add, remove, check
contract EndUserRole {
  using Roles for Roles.Role;

  event EndUserAdded(address indexed account);
  event EndUserRemoved(address indexed account);
  // Define a struct 'EndUsers' by inheriting from 'Roles' library, struct Role
  Roles.Role private _EndUsers;

  // In the constructor make the address that deploys this contract the 1st EndUser
  constructor() public {
    _addEndUser(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyEndUser() {
    require(isEndUser(msg.sender), "EndUserRole : caller does not have the EndUser role");
    _;
  }

  // Define a function 'isEndUser' to check this role
  function isEndUser(address account) public view returns (bool) {
    return _EndUsers.has(account);
  }

  // Define a function 'addEndUser' that adds this role
  function addEndUser(address account) public onlyEndUser {
    _addEndUser(account);
  }

  // Define a function 'renounceEndUser' to renounce this role
  function renounceEndUser() public {
    _removeEndUser(msg.sender);
  }

  // Define an internal function '_addEndUser' to add this role, called by 'addEndUser'
  function _addEndUser(address account) internal {
    _EndUsers.add(account);
    emit EndUserAdded(account);
  }

  // Define an internal function '_removeEndUser' to remove this role, called by 'removeEndUser'
  function _removeEndUser(address account) internal {
    _EndUsers.remove(account);
    emit EndUserRemoved(account);
  }
}