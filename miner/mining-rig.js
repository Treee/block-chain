'use strict'

var GenericMiner = require('./generic-miner');
var hashingFunction = require('object-hash');

var genericCatMiner = new GenericMiner('Cat miner seed data', 'ca7', 1);
genericCatMiner.mineSomeBlocks(5);
genericCatMiner.printGenericChain();

var genericDogMiner = new GenericMiner('Dog miner seed data', 'd06', 1);
genericDogMiner.mineSomeBlocks(5);
genericDogMiner.printGenericChain();

var genericCasinoMiner = new GenericMiner('Luckiest Mining Chain', '7', 3);
genericCasinoMiner.mineSomeBlocks(5);
genericCasinoMiner.printGenericChain();

var genericMiner = new GenericMiner('generic data', '0', 3, (currentBlockChainHash, blockData) => {
    blockData.nonce = blockData.nonce + Math.round((Math.random() * 100));
    let blockHash = hashingFunction([currentBlockChainHash, blockData]);
    return blockHash;
});
genericMiner.mineSomeBlocks(5);
genericMiner.printGenericChain();