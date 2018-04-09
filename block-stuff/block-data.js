'use scrict'

// The object that will hold any data for a block
// example usage:

// import the block-data file so we can use the code
// var BlockData = require('./block-data');

// create a new block object, pass any data as a parameter
// var blockData = new BlockData(data);


var blockData = function (data) {

    // assign the data to a variable called blockData
    var blockData = data;
    return {
        blockData
    };
}

// expose the blockData variable so it can be used in a require('') statement
module.exports = blockData;