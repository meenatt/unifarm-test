// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";

contract UniFarmTest {
    using Counters for Counters.Counter;

    Counters.Counter private numberOfWallets;
    uint256 private total;

    mapping(address => uint256) private users;

    function addNum(uint256 _num) public {
        require(_num > 0, "number cannot be < 1");
        if (users[msg.sender] == 0) {
            numberOfWallets.increment();
        }
        users[msg.sender] += _num;
        total += _num;
    }

    function getSummary() external view returns (uint256, uint256) {
        return (numberOfWallets.current(), total);
    }

    function getValueByUser(address _user) external view returns (uint256) {
        return users[_user];
    }
}
