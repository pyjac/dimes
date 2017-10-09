var Web3EthAccounts = require('web3-eth-accounts');

var account = new Web3EthAccounts('ws://localhost:8546');
var newAccount = account.create();
console.log(newAccount);
// save new account to firebase
