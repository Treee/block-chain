var ohash = require('object-hash');
var Block = require('./block');
var BlockData = require('./block-data');

var blockchain = function (genesisBlock) {
    var numberOfBlocks = 0;
    var blocks = {};
    blocks[numberOfBlocks] = genesisBlock;
    return {
        addNewBlock: function (data) {
            var newStuffToHash = {
                previousHash: this.getCurrentHash(),
                blockData: data
            };
            var newBlockData = new BlockData(ohash(newStuffToHash), data);
            var newBlock = new Block(newBlockData);
            numberOfBlocks++;
            blocks[numberOfBlocks] = newBlock;
        },
        getCurrentHash: function () {
            return blocks[numberOfBlocks].getBlockData().getHash();
        },
        printOutBlockChain: function () {
            for (var index = 0; index < numberOfBlocks + 1; index++) {
                var blockData = blocks[index].getBlockData();
                console.log(`Block #${index} has a hash of ${blockData.getHash()} with data: ${JSON.stringify(blockData.getData())}`);
            }
        }
    };
};

module.exports = blockchain;