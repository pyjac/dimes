module.exports = [ 
    { 
        "constant": false, 
        "inputs": [ { "name": "newSellPrice", "type": "uint256" }, { "name": "newBuyPrice", "type": "uint256" } ], 
        "name": "setPrices", "outputs": [], 
        "payable": false, "type": "function" 
    }
    , { 
        "constant": true, 
        "inputs": [],
        "name": "name", 
        "outputs": [ { "name": "", "type": "string", "value": "Dime" } ], 
        "payable": false, 
        "type": "function"
    }, { 
        "constant": false,
        "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], 
        "name": "approve", 
        "outputs": [ { "name": "success", "type": "bool" } ], 
        "payable": false, 
        "type": "function" 
    }, 
    { 
        "constant": true, 
        "inputs": [], 
        "name": "totalSupply", 
        "outputs": [ { "name": "", "type": "uint256", "value": "21000000" } ], 
        "payable": false, 
        "type": "function" 
    }, { 
        "constant": false, 
        "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], 
        "name": "transferFrom", 
        "outputs": [ { "name": "success", "type": "bool" } ], 
        "payable": false, 
        "type": "function" 
    }, { 
        "constant": true, 
        "inputs": [],
         "name": "decimals", 
         "outputs": [ { "name": "", "type": "uint8", "value": "0" } ], 
         "payable": false, 
         "type": "function" 
    }, { 
        "constant": true, 
        "inputs": [], 
        "name": "sellPrice", 
        "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], 
        "payable": false, 
        "type": "function" 
    }, { 
        "constant": true, 
        "inputs": [], 
        "name": "standard", 
        "outputs": [ { "name": "", "type": "string", "value": "Token 0.1" } ], 
        "payable": false, 
        "type": "function" 
    }, { 
        "constant": true, 
        "inputs": [ { "name": "", "type": "address" } ], 
        "name": "balanceOf", 
        "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], 
        "payable": false, 
        "type": "function" 
    }, { 
        "constant": false, 
        "inputs": [ { "name": "target", "type": "address" }, { "name": "mintedAmount", "type": "uint256" } ], 
        "name": "mintToken", 
        "outputs": [], 
        "payable": false, 
        "type": "function" 
    }, { 
        "constant": true, 
        "inputs": [], 
        "name": "buyPrice", 
        "outputs": [ { "name": "", "type": "uint256", "value": "0" } ],
        "payable": false, 
        "type": "function" 
    }, { 
        "constant": true, 
        "inputs": [], 
        "name": "owner", 
        "outputs": [ { "name": "", "type": "address", "value": "0xa647e90fba13755eb08201e2a7bfaca9cac1f500" } ], 
        "payable": false, 
        "type": "function" 
    }, { 
        "constant": true, 
        "inputs": [], 
        "name": "symbol", 
        "outputs": [ { "name": "", "type": "string", "value": "$0.10" } ], 
        "payable": false, 
        "type": "function" 
    }, { 
        "constant": false, 
        "inputs": [], 
        "name": "buy", 
        "outputs": [], 
        "payable": true, 
        "type": "function" 
    }, { 
        "constant": false, 
        "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], 
        "name": "transfer", 
        "outputs": [],
        "payable": false, 
        "type": "function" 
    }, { 
        "constant": true,
        "inputs": [ { "name": "", "type": "address" } ], 
        "name": "frozenAccount", 
        "outputs": [ { "name": "", "type": "bool", "value": false } ], 
        "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" } ], "name": "approveAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "amount", "type": "uint256" } ], "name": "sell", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "target", "type": "address" }, { "name": "freeze", "type": "bool" } ], "name": "freezeAccount", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "initial Supply", "template": "elements_input_uint", "value": "21000000" }, { "name": "tokenName", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "token Name", "template": "elements_input_string", "value": "Lukesters" }, { "name": "decimalUnits", "type": "uint8", "index": 2, "typeShort": "uint", "bits": "8", "displayName": "decimal Units", "template": "elements_input_uint", "value": "0" }, { "name": "tokenSymbol", "type": "string", "index": 3, "typeShort": "string", "bits": "", "displayName": "token Symbol", "template": "elements_input_string", "value": "LUK" } ], "payable": false, "type": "constructor" }, { "payable": false, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "target", "type": "address" }, { "indexed": false, "name": "frozen", "type": "bool" } ], "name": "FrozenFunds", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]
