var Block = require('./block');
var BlockChain = require('./block-chain');
var hash = require('object-hash');

var genesisData = 'This is my very first block';
//console.log(hash(genesisData));


var genesisBlock = new Block('This is my very first block');
var blockChain = new BlockChain(genesisBlock);

var blockInput = {
    previousHash: blockChain.getCurrentHash(),
    data: 'my second block'
};
blockChain.addNewBlock(new Block(blockInput));

blockInput = {
    previousHash: blockChain.getCurrentHash(),
    data: 'my third block'
};
blockChain.addNewBlock(new Block(blockInput));


var blokeChain = new BlockChain(new Block('some dude'));
