var Block = require('./block');
var BlockChain = require('./block-chain');
var BlockData = require('./block-data');
var ohash = require('object-hash');

var genesisData = 'This is my very first block';
var genesisBlockData = new BlockData(ohash(genesisData), genesisData);
var genesisBlock = new Block(genesisBlockData);
var blockChain = new BlockChain(genesisBlock);

blockChain.addNewBlock('some block data');
blockChain.addNewBlock({ objectVariableOne: 'some text', objectVariableTwo: 42, objectVariableThree: false });
blockChain.addNewBlock('the data we add is irrelevant');
blockChain.addNewBlock(null);
blockChain.addNewBlock('even no data works');
blockChain.printOutBlockChain();

console.log('\n\n');


genesisData = 'This is my very first block';
genesisBlockData = new BlockData(ohash(genesisData), genesisData);
genesisBlock = new Block(genesisBlockData);
blockChain = new BlockChain(genesisBlock);


blockChain.addNewBlock('watch how modifying something earlier in the block chain, affects everything down the line. even when data is almost the same');
blockChain.addNewBlock({ objectVariableOne: 'some text', objectVariableTwo: 42, objectVariableThree: false });
blockChain.addNewBlock('the data we add is irrelevant');
blockChain.addNewBlock(null);
blockChain.addNewBlock('even no data works');
blockChain.printOutBlockChain();