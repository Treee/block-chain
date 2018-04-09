'use strict';
// import the object hash library from npm (npm install object-hash)
const hashingFunction = require('object-hash');

// imutable block
const block = function (previousBlocksHash, data) {

    const blockData = data;
    const currentHash = hashingFunction([previousBlocksHash, blockData]);

    return {
        getData: function () {
            return blockData;
        },
        getHash: function () {
            return currentHash;
        },
        print: function () {
            console.log(`Hash: ${currentHash} Data: ${JSON.stringify(blockData)}`);
        }
    };
};

module.exports = block;