const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'quarters-c2d6e',
  keyFilename:  __dirname +  '/keyfile.json',
});


module.exports = {
    accounts: firestore.collection('accounts')
};