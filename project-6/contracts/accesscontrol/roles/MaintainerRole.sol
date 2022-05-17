// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// Import the library 'Roles'
import "../Roles.sol";

// Define a contract 'MaintainerRole' to manage this role - add, remove, check
contract MaintainerRole {
  using Roles for Roles.Role;

  event MaintainerAdded(address indexed account);
  event MaintainerRemoved(address indexed account);
  // Define a struct 'Maintainers' by inheriting from 'Roles' library, struct Role
  Roles.Role private _Maintainers;

  // In the constructor make the address that deploys this contract the 1st Maintainer
  constructor() public {
    _addMaintainer(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyMaintainer() {
    require(isMaintainer(msg.sender), "MaintainerRole : caller does not have the Maintainer role");
    _;
  }

  // Define a function 'isMaintainer' to check this role
  function isMaintainer(address account) public view returns (bool) {
    return _Maintainers.has(account);
  }

  // Define a function 'addMaintainer' that adds this role
  function addMaintainer(address account) public onlyMaintainer {
    _addMaintainer(account);
  }

  // Define a function 'renounceMaintainer' to renounce this role
  function renounceMaintainer() public {
    _removeMaintainer(msg.sender);
  }

  // Define an internal function '_addMaintainer' to add this role, called by 'addMaintainer'
  function _addMaintainer(address account) internal {
    _Maintainers.add(account);
    emit MaintainerAdded(account);
  }

  // Define an internal function '_removeMaintainer' to remove this role, called by 'removeMaintainer'
  function _removeMaintainer(address account) internal {
    _Maintainers.remove(account);
    emit MaintainerRemoved(account);
  }
}