'use strict'

const hashingFunction = require('object-hash');
const BlockChain = require('../block-chain');
const BlockData = require('../block-data');
const Block = require('../block');

// Create a new object that is able to mine whatever you want with any mining strategy.
// GenesisData: Any data. normally seed data or inaugural mesage
// PatterToMatch: The format of the beginning of the hash specific to this miner.
// - Note: We have five 0's but the pattern we are matching is a single 0. ex: '00000239acd3a377d480ef2f7b60caf9fd6571f6'
// NumberOfGroupsToMatch: How many groups of the above pattern to match.
// - Note: This is where we match multiple of the above pattern.
// - Note: We do this so we can separate what we are hashing for and how many we are searching for.
// - Note: This allows us to modify the "difficulty" of finding the next valid block. (finding '0' is easier than '00')
// CustomMiningFunction: This allow the ability to override the default mining strategy
// - Note: Expects the return of a hash. Input params are the 'currentBlockChainHash' and 'blockData'
var genericMiner = function (genesisData, patternToMatch, numberOfGroupsToMatch, customMiningFunction) {
    const hashPattern = patternToMatch;
    const numberOfPatternGroupsToMatch = numberOfGroupsToMatch;
    const regex = new RegExp(`^(${hashPattern}){${numberOfPatternGroupsToMatch}}`, 'gm');

    const genesisBlockData = new BlockData(genesisData);
    const genesisBlock = new Block(hashingFunction(genesisData), genesisBlockData);
    let blockChain = new BlockChain(genesisBlock);

    // The default hashing strategy is to just increment the block data's nonce by 1.
    // This changes the data by just enough to get a different hash.
    function defaultGenerateNewHash(currentBlockChainHash, blockData) {
        blockData.nonce++;
        let blockHash = hashingFunction([currentBlockChainHash, blockData]);
        return blockHash;
    }

    // Generate a new hash given the current hash and any block data (if any)
    function generateNewHash(currentBlockChainHash, blockData) {
        let newHash = defaultGenerateNewHash(currentBlockChainHash, blockData)
        // check to see if we have a custom mining strategy
        if (!!customMiningFunction) {
            // if we do, use it
            newHash = customMiningFunction(currentBlockChainHash, blockData);
        }
        return newHash;
    }

    // Mine the next valid block given some data (if any)
    function mineNextValidBlock(data) {
        const blockData = new BlockData(data);
        blockData['nonce'] = 0;
        const currentBlockChainHash = blockChain.getCurrentHash();
        findValidHash(currentBlockChainHash, blockData);
        const nextBlock = new Block(currentBlockChainHash, blockData);
        blockChain.addBlock(nextBlock);
        return nextBlock;
    };

    // Hash until a valid hash is found
    function findValidHash(currentBlockChainHash, blockData) {
        let numberOfAttempts = 0;
        let blockHash = '';
        while (!isValidHash(blockHash)) {
            blockHash = generateNewHash(currentBlockChainHash, blockData);
            // if (numberOfAttempts % 100000 === 0) {
            //     console.log(`Mining... nonce: ${blockData.nonce}`);
            // }
            // numberOfAttempts++;
        }
    }

    // Check a hash and return if it matches the pattern
    function isValidHash(hashToCheck) {
        const matchedGroups = regex.exec(hashToCheck);
        return matchedGroups && matchedGroups.length > 0;
    }

    // This is a helper function to test this miner
    function mineNumberOfBlocks(numberOfBlocks) {
        for (let i = 0; i < numberOfBlocks; i++) {
            let minedBlock = mineNextValidBlock(`Mined ${i} # of ${hashPattern}.`);
            minedBlock.print();
        }
    }

    return {
        mineNextBlock: function (data) {
            return mineNextValidBlock(data);
        },
        mineSomeBlocks: function (numberOfBlocks) {
            mineNumberOfBlocks(numberOfBlocks);
        },
        printGenericChain: function () {
            blockChain.printOutBlockChain();
        }
    };
}

module.exports = genericMiner;