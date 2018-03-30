var hash = require('object-hash');
var block = function (data) {
    const currentBlockHash = hash(data);

    return {
        getHash: function () {
            return currentBlockHash;
        }
    }
};

module.exports = block;