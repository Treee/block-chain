var blockchain = function (genesisBlock) {
    var numberOfBlocks = 0;
    var blocks = {};
    blocks[numberOfBlocks] = genesisBlock;
    return {
        addNewBlock: function (block) {
            numberOfBlocks++;
            blocks[numberOfBlocks] = block;
        },
        getCurrentHash: function () {
            return blocks[numberOfBlocks].getHash();
        }
    };
};

module.exports = blockchain;