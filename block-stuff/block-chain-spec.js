const BlockChain = require('./block-chain');
const Block = require('./block');
const BlockData = require('./block-data');
const hash = require('object-hash');

describe('Blockchain', () => {

    let testBlockChain;
    const genesisData = 'test genesis data';
    const genesisBlockData = new BlockData(genesisData);
    const genesisBlock = new Block(hash(genesisData), genesisBlockData);

    beforeEach(() => {
        testBlockChain = new BlockChain(genesisBlock);
        expect(testBlockChain.getLength()).toBe(1);
    });

    describe('AddBlock', () => {
        it('adds a block to the blockchain', () => {
            testBlockChain.addBlock({});
            expect(testBlockChain.getLength()).toBe(2);
        });
    });

    describe('GetBlock', () => {
        it('returns a block given a valid block hash', () => {
            const actualBlock = testBlockChain.getBlock(genesisBlock.getHash());
            expect(actualBlock.getHash()).toEqual(genesisBlock.getHash());
            expect(actualBlock.getData()).toEqual(genesisBlock.getData());
        });

        it('returns a block given a valid block hash', () => {
            const testData = 'new test data';
            let newBlockData = new BlockData(testData);
            let newBlock = new Block(testBlockChain.getCurrentHash(), newBlockData);
            testBlockChain.addBlock(newBlock);
            const actualBlock = testBlockChain.getBlock(newBlock.getHash());
            expect(actualBlock.getHash()).toEqual(newBlock.getHash());
            expect(actualBlock.getData()).toEqual(newBlock.getData());
        });
    });

    describe('CreateBlockFromData', () => {
        it('adds a block from some null data', () => {
            testBlockChain.createBlockFromData();
            const actual = testBlockChain.getBlock(testBlockChain.getCurrentHash());
            expect(testBlockChain.getLength()).toBe(2);
            expect(actual.getData()).toEqual(new BlockData());
        });

        it('adds a block from some data', () => {
            const someData = {
                foo: 'bar',
                test: 0
            };
            testBlockChain.createBlockFromData(someData);
            const actual = testBlockChain.getBlock(testBlockChain.getCurrentHash());
            expect(testBlockChain.getLength()).toBe(2);
            expect(actual.getData()).toEqual(new BlockData(someData));
        });
    });
});