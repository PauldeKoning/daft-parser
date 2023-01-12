import getPriceNumberFromString from "../../src/parser/price.parser";

describe('Get price correctly', () => {
    it('Should return 1000 on 1,000 per month', () => {
        const price = getPriceNumberFromString('€1,000 per month');

        expect(price).toBe(1000);
    });

    it('Should return 1000 on 1,000 per month with trailing space', () => {
        const price = getPriceNumberFromString('€1,000 per month ');

        expect(price).toBe(1000);
    });

    it('Should return 1000 on 1,000 per month with front space', () => {
        const price = getPriceNumberFromString(' €1,000 per month ');

        expect(price).toBe(1000);
    });

    it('Should return 1000 on 1,000 per month with random comma', () => {
        const price = getPriceNumberFromString('€100,0 per month');

        expect(price).toBe(1000);
    });

    it('Should return 1000 on 250 per week', () => {
        const price = getPriceNumberFromString('€250 per week');

        expect(price).toBe(1000);
    });

    it('Should return 4000 on 1,000 per week', () => {
        const price = getPriceNumberFromString('€1,000 per week');

        expect(price).toBe(4000);
    });

    it('Should return 4000 on 1,000 per week with random comma', () => {
        const price = getPriceNumberFromString('€1,00,0 per week');

        expect(price).toBe(4000);
    });

    it('Should return 40000 on 10,000 per week', () => {
        const price = getPriceNumberFromString('€10,000 per week');

        expect(price).toBe(40000);
    });

    it('Should return 40000 on 40,000 per month', () => {
        const price = getPriceNumberFromString('€40,000 per month');

        expect(price).toBe(40000);
    });
});

describe('Get price incorrectly', () => {
    it('Should return null when price is incorrectly formatted', () => {
        const price = getPriceNumberFromString('€4,000 pe,r month');

        expect(price).toBe(null);
    });

    it('Should return null when price has wrong period', () => {
        const price = getPriceNumberFromString('€4,000 per year');

        expect(price).toBe(null);
    });

    it('Should return null when theres multiple per month', () => {
        const price = getPriceNumberFromString('€4,000 per month per month');

        expect(price).toBe(null);
    });

    it('Should return null when pricetext is null', () => {
        const price = getPriceNumberFromString(null);

        expect(price).toBe(null);
    });

    it('Should return null when pricetext is random', () => {
        const price = getPriceNumberFromString('lorem ipsum');

        expect(price).toBe(null);
    });

    it('Should return null when no number given', () => {
        const price = getPriceNumberFromString("€ per month");

        expect(price).toBe(null);
    });

    it('Should return null when number is 0000', () => {
        const price = getPriceNumberFromString("€0,000 per month");

        expect(price).toBe(null);
    });
});