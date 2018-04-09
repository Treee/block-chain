const Block = require('./block');
const hash = require('object-hash');
describe('Block', () => {
    it('returns the data given to it', () => {
        const previousBlockHash = 'testHash!!!!';
        const expectedData = 'test block data';
        const expectedHash = hash([previousBlockHash, expectedData]);
        const testBlock = new Block(previousBlockHash, expectedData);
        expect(testBlock.getData()).toEqual(expectedData);
        expect(testBlock.getHash()).toEqual(expectedHash);
    });
});