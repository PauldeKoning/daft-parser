import getBedroomsFromString from "../../src/parser/bedroom.parser";

describe('Parse bedrooms correctly', () => {
    it('Get 3 with 3 bed', () => {
        const beds = getBedroomsFromString('3 Bed');

        expect(beds).toBe(3);
    });

    it('Get 69 with 69 bed', () => {
        const beds = getBedroomsFromString('69 Bed');

        expect(beds).toBe(69);
    });

    it('Get 3 with 3 bed with spaces in front', () => {
        const beds = getBedroomsFromString(' 3 Bed');

        expect(beds).toBe(3);
    });

    it('Get 3 with 3 bed with spaces appended', () => {
        const beds = getBedroomsFromString('3 Bed ');

        expect(beds).toBe(3);
    });

    it('Get 3 with 3 bed with lowercase bed', () => {
        const beds = getBedroomsFromString('3 bed');

        expect(beds).toBe(3);
    });
});

describe('Parse bedrooms with incorrect data', () => {
    it('Get null with bed misspelled', () => {
        const beds = getBedroomsFromString('3 Be d');

        expect(beds).toBe(null);
    });

    it('Get null without space', () => {
        const beds = getBedroomsFromString('3Bed');

        expect(beds).toBe(null);
    });

    it('Get null with extra bed', () => {
        const beds = getBedroomsFromString('3 Bed bed');

        expect(beds).toBe(null);
    });

    it('Get null with extra number', () => {
        const beds = getBedroomsFromString('6 3 Bed');

        expect(beds).toBe(null);
    });

    it('Get null with null input', () => {
        const beds = getBedroomsFromString(null);

        expect(beds).toBe(null);
    });
});