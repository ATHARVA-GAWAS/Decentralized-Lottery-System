const Web3 = require('web3');
require('dotenv').config();

const { PROJECT_ID } = process.env;

// Set up Web3 with the provider
const provider = new Web3(new Web3.providers.HttpProvider(`https://linea-goerli.infura.io/v3/$b76f8dded52c4cc7a75798e1717400c3`));
const web3 = new Web3(provider);

// Fetch the latest block number
web3.eth.getBlockNumber()
  .then(blockNumber => {
    console.log("Latest Block Number: ", blockNumber);
  })
  .catch(error => {
    console.error("Error fetching block number: ", error);
  });
