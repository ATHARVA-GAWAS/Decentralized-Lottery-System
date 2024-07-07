// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedLottery {
    address public manager;
    address[] public players;
    address public recentWinner;
    uint256 public randomResult;

    constructor() {
        manager = msg.sender;
    }

    function buyTicket() public payable {
        require(msg.value == 0.1 ether, "Ticket costs 0.1 ether");
        players.push(msg.sender);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function drawWinner() public restricted {
        require(players.length > 0, "No players in the lottery");
        
        uint256 index = random() % players.length;
        recentWinner = players[index];

        // Transfer the balance to the winner
        payable(recentWinner).transfer(address(this).balance);

        // Reset the players array
        delete players;
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, players.length)));
    }

    modifier restricted() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }
}
