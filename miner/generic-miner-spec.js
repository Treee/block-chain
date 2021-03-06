const GenericMiner = require('./generic-miner');
const Block = require('../block-stuff/block');
const BlockData = require('../block-stuff/block-data');
const hash = require('object-hash');
describe('Generic Miner', () => {
    let genericMiner, genesisBlockHash;
    const hashPattern = '8';
    const numGroupsToMatch = 2;
    const genesisData = 'test data';
    beforeEach(() => {
        let blockData = new BlockData(genesisData);
        // the first block is wierd in how the hash is calculated
        genesisBlockHash = hash([hash(genesisData), blockData]);
        genericMiner = new GenericMiner(genesisData, hashPattern, numGroupsToMatch);
    });

    describe('mineNextBlock', () => {
        it('returns a block', () => {
            let blockData = new BlockData();
            blockData.nonce = 45;
            const expectedHash = hash([genesisBlockHash, blockData]);
            const actual = genericMiner.mineNextBlock();
            expect(actual.getHash()).toEqual(expectedHash);
            expect(actual.getData()).toEqual(blockData);
        });

        it('returns a block with the given data', () => {
            let testData = 'test block data';
            let blockData = new BlockData(testData);
            blockData.nonce = 237;
            const expectedHash = hash([genesisBlockHash, blockData]);
            const actual = genericMiner.mineNextBlock(testData);
            expect(actual.getHash()).toEqual(expectedHash);
            expect(actual.getData()).toEqual(blockData);
        });

        it('returns a valid block', () => {
            let testData = 'test block data';
            const actual = genericMiner.mineNextBlock(testData);
            expect(actual.getHash().substring(0, 2)).toEqual('88');
            testData = 'modified input';
            const actual1 = genericMiner.mineNextBlock(testData);
            expect(actual1.getHash().substring(0, 2)).toEqual('88');
        });
    });

    describe('getGenericChain', () => {
        it('returns the blockchain', () => {
            const actual = genericMiner.getGenericChain();
            expect(actual.getCurrentHash()).toEqual(genesisBlockHash);
            expect(actual.getLength()).toBe(1);
        });
    });
});