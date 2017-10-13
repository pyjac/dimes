const Web3EthAccounts = require('web3-eth-accounts');
const express = require('express');
const etherscanApi = require('etherscan-api').init(process.env.ETHER_SCAN_KEY, 'rinkeby');
const firestore = require('../firestore');
const crypt = require('../crypt');
const utils = require('../utils');
const interface = require('../contractABI');


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const router = express.Router();

/* GET home page. */
router.get('/sync-balances', function(req, res) {
    firestore.accounts.get().then(snapshot => {
        snapshot.forEach(async doc => {
            let address = doc.data().publicAddress
            let docRef = doc._ref;

            etherscanApi.account.tokenbalance(address, null, process.env.CONTRACT_ADDRESS).then((data) => {
                docRef.update({
                    balance: data.result
                });
            }).catch(err => console.log('Error getting documents', err));
            // TODO: Remove.. This is needed to avoid getting blocked by etherscan
            // For sending more than 5 requests per second
            // Another work around would be that we batch 20 account balance request
            await timeout(1000);
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
    return res.json(200);

});
router.get('/create-wallet', function(req, res) {
    let account = new Web3EthAccounts();
    let newAccount = account.create();
    firestore.accounts.add({
        privateKey: crypt.encrypt(newAccount.privateKey.substring(2)),
        publicAddress: newAccount.address,
        user: 'someone'
    }).then(() => {
        // Document created successfully.
        return res.json(200, "Good");
    });
});

/* GET balance. */
router.get('/me/check-balance/:address', (req, res) => {
    // console.log(crypt.encrypt("314adf1de179d4cb69174dce4c4682d268489c3c3bc32504a22122548262d42e"));
    // TODO: Use current user
    let address = req.params.address;
    setTimeout(() =>  // TODO: handle error
    etherscanApi.account.tokenbalance(address, null, process.env.CONTRACT_ADDRESS).then((result) => {
        return res.json({ result }); 
    }).catch(err => res.json({ err })),5000)
   
});









// Quarantine

var Web3 = require('web3');
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
var txutils = lightwallet.txutils;
var web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.infura.io/')
);


function sendRaw(rawTx, key) {
    return new Promise((resolve, reject) => {
        var privateKey = new Buffer(key, 'hex');
        var transaction = new tx(rawTx);
        transaction.sign(privateKey);
        var serializedTx = transaction.serialize().toString('hex');
        // etherscanApi.proxy.eth_sendRawTransaction(serializedTx);
        web3.eth.sendSignedTransaction(
            '0x' + serializedTx, function(err, result) {
            if(err) {
                console.log("Bad", err);
                reject(err);
            } else {
                resolve(result);
                console.log("Good", result);
            }
        });
    });
}

// TODO: Find a better and cleaner way to do this
router.post('/me/send/:address', function(req, res) {
    // send some Dimes
    const _sendTo = req.params.address;
    const { amount, me } = req.body;
    const docRef = firestore.accounts.where("publicAddress" , "==", me);
    
    docRef.get().then(function(querySnapshot) {
        if (querySnapshot.size != 1) {
            console.log("No such document!");
            return res.json(404)
        } 
        let { privateKey } = querySnapshot.docs[0].data();
        web3.eth.getTransactionCount(me).then(non => {
            const txOptions = {
                nonce: web3.utils.toHex(non),
                gasLimit: web3.utils.toHex(800000),
                gasPrice: web3.utils.toHex(20000000000),
                to: process.env.CONTRACT_ADDRESS
            }
            const rawTx = txutils.functionTx(interface, 'transfer', [ _sendTo , parseInt(amount)], txOptions);
            sendRaw(rawTx, crypt.decrypt(privateKey))
            .then(result => res.status(200).json({ result }))
            .catch(error => res.status(500).json({ error: error.message }));
        });
    }).catch(function(error) {
        console.log("Error getting document:", error);
        return res.json({ error: error.message }); 
    });
});

module.exports = router;
