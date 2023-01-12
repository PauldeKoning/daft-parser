import {getLocationFromString} from "../../src/parser/location.parser";
import {ListingLocation} from "../../src/model/listing";


describe('Get location correctly', () => {
    it('Should return D01 from Dublin 1', () => {
        const location = getLocationFromString('Dublin 1');

        expect(location).toBe(ListingLocation.D01);
    });

    it('Should return D02 from Dublin 2', () => {
        const location = getLocationFromString('Dublin 2');

        expect(location).toBe(ListingLocation.D02);
    });

    it('Should return D06 from Dublin 6', () => {
        const location = getLocationFromString('Dublin 6');

        expect(location).toBe(ListingLocation.D06);
    });

    it('Should return D06W from Dublin 6W', () => {
        const location = getLocationFromString('Dublin 6W');

        expect(location).toBe(ListingLocation.D06W);
    });
});

describe('Get locations fails', () => {
    it('Should return null when wrong town name is given', () => {
        const location = getLocationFromString('Armagh 4');

        expect(location).toBe(null);
    });

    it('Should return null when out of bounds number is given', () => {
        const location = getLocationFromString('Dublin 69');

        expect(location).toBe(null);
    });

    it('Should return null when null is given', () => {
        const location = getLocationFromString(null);

        expect(location).toBe(null);
    });
});