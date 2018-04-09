'use scrict';

var Block = require('./block');
var BlockData = require('./block-data');

var blockchain = function (genesisBlock) {

    //private variables
    var blocks = {};
    var numberOfBlocks = 0;
    blocks[numberOfBlocks] = genesisBlock;

    //private functions
    function createNewBlockFromData(data) {
        var newBlockData = new BlockData(data);
        var newBlock = new Block(blocks[numberOfBlocks].getHash(), newBlockData);
        numberOfBlocks++;
        blocks[numberOfBlocks] = newBlock;
    }

    function addNewValidBlock(block) {
        numberOfBlocks++;
        blocks[numberOfBlocks] = block;
    }

    function print() {
        console.log('=====BlockChain Start=====');
        for (var index = 0; index < numberOfBlocks + 1; index++) {
            blocks[index].print();
        }
        console.log('=====BlockChain End=======');
    }

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
            // we add 1 because we really started at 0
            return numberOfBlocks + 1;
        },
        printOutBlockChain: function () {
            print();
        }
    };
};

module.exports = blockchain;