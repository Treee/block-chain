'use strict'

var CatMiner = require('./cat-miner');
var DogMiner = require('./dog-miner');
var Lucky7Miner = require('./lucky7-miner');
var GenericMiner = require('./generic-miner');
var hashingFunction = require('object-hash');

// var catMiner = new CatMiner('Cat miner seed data for genesis block');
// catMiner.mineSomeBlocks(15);
// catMiner.printCatChain();

// var dogMiner = new DogMiner('Dog mining says its better than cat miner genesis');
// dogMiner.mineSomeBlocks(10);
// dogMiner.printDogChain();

// var luckyMiner = new Lucky7Miner('Luckiest mining chain');
// luckyMiner.mineSomeBlocks(10);
// luckyMiner.printLucky7Chain();

var genericMiner = new GenericMiner('generic data', 'ac', 1, (currentBlockChainHash, blockData) => {
    blockData.nonce = blockData.nonce + Math.round((Math.random() * 100));
    let blockHash = hashingFunction([currentBlockChainHash, blockData]);
    return blockHash;
});
genericMiner.mineSomeBlocks(5);
genericMiner.printGenericChain();