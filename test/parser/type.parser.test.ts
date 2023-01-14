import getListingTypeFromString from "../../src/parser/type.parser";
import {ListingType} from "../../src/model/listing";

describe('Get type successfully', () => {
    it('Get type successfully with studio', () => {
        const type = getListingTypeFromString('Studio');

        expect(type).toBe(ListingType.studio);
    });

    it('Get type successfully with apartment', () => {
        const type = getListingTypeFromString('Apartment');

        expect(type).toBe(ListingType.apartment);
    });

    it('Get type successfully with house', () => {
        const type = getListingTypeFromString('House');

        expect(type).toBe(ListingType.house);
    });

    it('Get type successfully with house with space before', () => {
        const type = getListingTypeFromString(' House');

        expect(type).toBe(ListingType.house);
    });

    it('Get type successfully with house with space after', () => {
        const type = getListingTypeFromString('House ');

        expect(type).toBe(ListingType.house);
    });

    it('Get type successfully with house lowercase', () => {
        const type = getListingTypeFromString('house');

        expect(type).toBe(ListingType.house);
    });

    it('Get type successfully with multiple house', () => {
        const type = getListingTypeFromString('house house');

        expect(type).toBe(ListingType.house);
    });
});

describe('Get null if type is wrong', () => {
    it('Get null if type is null', () => {
        const type = getListingTypeFromString(null);

        expect(type).toBe(null);
    });

    it('Get null if type is misspelled', () => {
        const type = getListingTypeFromString('Hosdue');

        expect(type).toBe(null);
    });
});