var blockData = function (hash, data) {
    const blockHash = hash;
    const blockData = data;
    return {
        getHash: function () {
            return blockHash;
        },
        getData: function () {
            return blockData;
        }
    }
}
module.exports = blockData;