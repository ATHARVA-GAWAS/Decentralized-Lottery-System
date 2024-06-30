// contracts/DecentralizedLottery.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedLottery {
    address public owner;
    address[] public players;
    uint256 public ticketPrice;
    uint256 public randomResult;

    constructor(uint256 _ticketPrice) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
    }

    function buyTicket() public payable {
        require(msg.value == ticketPrice, "Incorrect ticket price");
        players.push(msg.sender);
    }

    function drawWinner() public onlyOwner {
        require(players.length > 0, "No players in the lottery");
        randomResult = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, players.length))) % players.length;
        address winner = players[randomResult];
        payable(winner).transfer(address(this).balance);
        players = new address ; // Reset the players array
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
}
