'use scrict'

var Block = require('./block');
var BlockData = require('./block-data');

var blockchain = function (genesisBlock) {

    //private variables
    var numberOfBlocks = 0;
    var blocks = {};
    blocks[numberOfBlocks] = genesisBlock;

    //private functions
    function createNewBlockFromData(data) {
        var newBlockData = new BlockData(data);
        var newBlock = new Block(blocks[numberOfBlocks].getHash(), newBlockData);
        numberOfBlocks++;
        blocks[numberOfBlocks] = newBlock;
    };

    function addNewValidBlock(block) {
        numberOfBlocks++;
        blocks[numberOfBlocks] = block;
    };

    function print() {
        for (var index = 0; index < numberOfBlocks + 1; index++) {
            var block = blocks[index];
            var blockData = block.getData();
            console.log(`Block #${index} has a hash of ${block.getHash()} with data: ${JSON.stringify(blockData)}`);
        }
    };

    //public function
    return {
        addBlock: function (block) {
            addNewValidBlock(block);
        },
        createBlockFromData: function (data) {
            createNewBlockFromData(data);
        },
        getCurrentHash: function () {
            return blocks[numberOfBlocks].getHash();
        },
        getLength: function () {
            return numberOfBlocks;
        },
        printOutBlockChain: function () {
            print();
        }
    };
};

module.exports = blockchain;