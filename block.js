'use strict';

const hashingFunction = require('object-hash');

//imutable block
const block = function (previousBlocksHash, data) {

    const blockData = data;
    const currentHash = hashingFunction([previousBlocksHash, blockData]);

    return {
        getBlockData: function () {
            return blockData;
        },
        getBlockHash: function(){
            return currentHash;
        }
    }
};

module.exports = block;