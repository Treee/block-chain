var block = function (blockStuff) {
    const blockData = blockStuff;

    return {
        getBlockData: function () {
            return blockData;
        }
    }
};

module.exports = block;