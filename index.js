var Block = require('./block');
var BlockChain = require('./block-chain');
var BlockData = require('./block-data');
var ohash = require('object-hash');

var genesisData = 'This is my very first block';
var genesisBlockData = new BlockData(ohash(genesisData), genesisData);
var genesisBlock = new Block(genesisBlockData);
var blockChain = new BlockChain(genesisBlock);

blockChain.createBlockFromData({ objectVariableOne: 'some text', objectVariableTwo: 42, objectVariableThree: false });
blockChain.createBlockFromData('the data we add is irrelevant');
blockChain.createBlockFromData(null);
blockChain.createBlockFromData('even no data works');
blockChain.createBlockFromData('some block data');
blockChain.printOutBlockChain();

console.log('\n\n');


genesisData = 'This is my very first block';
genesisBlockData = new BlockData(ohash(genesisData), genesisData);
genesisBlock = new Block(genesisBlockData);
blockChain = new BlockChain(genesisBlock);


blockChain.createBlockFromData({ objectVariableOne: 'some text', objectVariableTwo: 42, objectVariableThree: false });
blockChain.createBlockFromData('the data we add is irrelevant');
blockChain.createBlockFromData(null);
blockChain.createBlockFromData('even no data works');
blockChain.createBlockFromData('watch how modifying something earlier in the block chain, affects everything down the line. even when data is almost the same');
blockChain.printOutBlockChain();