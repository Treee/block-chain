'use strict'

var CatMiner = require('./cat-miner');

var catMiner = new CatMiner('Cat miner seed data for genesis block');
catMiner.mineSomeBlocks(5);
catMiner.printCatChain();