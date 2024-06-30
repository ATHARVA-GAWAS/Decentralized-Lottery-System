// migrations/1_deploy_lottery.js
const DecentralizedLottery = artifacts.require("DecentralizedLottery");

module.exports = function (deployer) {
  const ticketPrice = web3.utils.toWei('0.1', 'ether');  // Ticket price in ether
  deployer.deploy(DecentralizedLottery, ticketPrice);
};
