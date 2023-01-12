import getIdFromString from "../../src/parser/id.parser";

describe('ID Parsed correctly', () => {
    it('Should return 500 given result-500', () => {
        const id = getIdFromString('result-500');

        expect(id).toBe(500);
    });
});

describe('ID Parsed to null', () => {
    it('Should return null when null given', () => {
        const id = getIdFromString(null);

        expect(id).toBe(null);
    });

    it('Should return null when string does not have result-', () => {
        const id = getIdFromString('500');

        expect(id).toBe(null);
    });

    it('Should return null when string has misspelling in result-', () => {
        const id = getIdFromString('resudlt-500');

        expect(id).toBe(null);
    });

    it ('Should return null when using space instead of dash', () => {
        const id = getIdFromString('result 500');

        expect(id).toBe(null);
    });

    it('Should return null when text is behind id', () => {
        const id = getIdFromString('result-500 test');

        expect(id).toBe(null);
    });
})