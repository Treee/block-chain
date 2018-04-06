'use strict'

const hashingFunction = require('object-hash');
const BlockChain = require('../block-chain');
const BlockData = require('../block-data');
const Block = require('../block');

var genericMiner = function (genesisData, patternToMatch, numberOfGroupsToMatch, customMiningFunction) {
    const hashPattern = patternToMatch;
    const numberOfPatternGroupsToMatch = numberOfGroupsToMatch;
    const regex = new RegExp(`^(${hashPattern}){${numberOfPatternGroupsToMatch}}`, 'gm');

    const genesisBlockData = new BlockData(genesisData);
    const genesisBlock = new Block(hashingFunction(genesisData), genesisBlockData);
    let blockChain = new BlockChain(genesisBlock);


    function mineNumberOfBlocks(numberOfBlocks) {
        for (let i = 0; i < numberOfBlocks; i++) {
            let minedBlock = mineNextValidBlock(`Mined ${i} # of ${hashPattern}.`);
            minedBlock.print();
        }
    }

    function defaultGenerateNewHash(currentBlockChainHash, blockData) {
        blockData.nonce++;
        let blockHash = hashingFunction([currentBlockChainHash, blockData]);
        return blockHash;
    }

    function generateNewHash(currentBlockChainHash, blockData) {
        let newHash = defaultGenerateNewHash(currentBlockChainHash, blockData)
        if (!!customMiningFunction) {
            newHash = customMiningFunction(currentBlockChainHash, blockData);
        }
        return newHash;
    }

    function mineNextValidBlock(data) {
        const blockData = new BlockData(data);
        blockData['nonce'] = 0;
        const currentBlockChainHash = blockChain.getCurrentHash();
        let blockHash = '';
        let numberOfAttempts = 0;
        while (!isValidHash(blockHash)) {
            blockHash = generateNewHash(currentBlockChainHash, blockData);
            if (numberOfAttempts % 100000 === 0) {
                console.log(`Still Mining... nonce: ${blockData.nonce}`);
            }
            numberOfAttempts++;
        }
        const nextBlock = new Block(currentBlockChainHash, blockData);
        blockChain.addBlock(nextBlock);
        return nextBlock;
    };

    function isValidHash(hashToCheck) {
        const matchedGroups = regex.exec(hashToCheck);
        return matchedGroups && matchedGroups.length > 0;
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