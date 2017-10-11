const Web3EthAccounts = require('web3-eth-accounts');
const AES = require("crypto-js/aes");
const express = require('express');
const firestore = require('../firestore')
const router = express.Router();

/* GET home page. */
router.get('/create-wallet', function(req, res) {
    let account = new Web3EthAccounts();
    let newAccount = account.create();
    firestore.accounts.add({
        privateKey: AES.encrypt(newAccount.privateKey, 'PrivateKey').toString(),
        publicAddress: newAccount.address,
        user: 'someone'
    }).then(() => {
        // Document created successfully.
    });
    return res.json(200, "Everything good");
});

module.exports = router;
