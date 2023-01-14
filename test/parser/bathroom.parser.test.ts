import getBathroomsFromString from "../../src/parser/bathroom.parser";


describe('Parse bathrooms correctly', () => {
    it('Get 3 with 3 bath', () => {
        const baths = getBathroomsFromString('3 bath');

        expect(baths).toBe(3);
    });

    it('Get 69 with 69 bath', () => {
        const baths = getBathroomsFromString('69 bath');

        expect(baths).toBe(69);
    });

    it('Get 3 with 3 bath with spaces in front', () => {
        const baths = getBathroomsFromString(' 3 bath');

        expect(baths).toBe(3);
    });

    it('Get 3 with 3 bath with spaces appended', () => {
        const baths = getBathroomsFromString('3 bath ');

        expect(baths).toBe(3);
    });

    it('Get 3 with 3 bath with lowercase bath', () => {
        const baths = getBathroomsFromString('3 bath');

        expect(baths).toBe(3);
    });
});

describe('Parse bathrooms with incorrect data', () => {
    it('Get null with bath misspelled', () => {
        const baths = getBathroomsFromString('3 Be d');

        expect(baths).toBe(null);
    });

    it('Get null without space', () => {
        const baths = getBathroomsFromString('3bath');

        expect(baths).toBe(null);
    });

    it('Get null with extra bath', () => {
        const baths = getBathroomsFromString('3 bath bath');

        expect(baths).toBe(null);
    });

    it('Get null with extra number', () => {
        const baths = getBathroomsFromString('6 3 bath');

        expect(baths).toBe(null);
    });

    it('Get null with null input', () => {
        const baths = getBathroomsFromString(null);

        expect(baths).toBe(null);
    });
});