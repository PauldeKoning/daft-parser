import {jest} from '@jest/globals'

import {getListingsFromArea} from "../../src/parser/listing.parser";

import {getLatestRentalResults} from "../../src/result.fetcher";
import {parse} from "node-html-parser";
import {ListingType} from "../../src/model/listing";

jest.mock("../../src/result.fetcher");

const htmlMultiple = "<ul>" +
    "<li data-testid='result-3424'>" +
    "<div data-testid='price'>€2,500 per month</div>" +
    "<p data-testid='address'>Dublin 6W</p>" +
    "</li>" +
    "<li data-testid='result-3425'>" +
    "<div data-testid='price'>€2,500 per month</div>" +
    "<p data-testid='address'>Dublin 8</p>" +
    "</li>" +
    "</ul>";

const htmlOneDoesntHaveAddress = "<ul>" +
    "<li data-testid='result-3424'>" +
    "<div data-testid='price'>€2,500 per month</div>" +
    "</li>" +
    "</ul>";

const htmlOneDoesntProperId = "<ul>" +
    "<li>" +
    "</li>" +
    "</ul>";

describe('Test listings', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Get two correct listings from website', async () => {
        const parsedHtml = parse(htmlMultiple);
        const response = parsedHtml.querySelectorAll('li[data-testid^="result-"]');
        (getLatestRentalResults as jest.MockedFunction<typeof getLatestRentalResults>).mockResolvedValue(response);

        const test = await getListingsFromArea("dublin-city");

        expect(test).toStrictEqual([
            {
                "id": 3424,
                "bathrooms": 1,
                "bedrooms": 1,
                "location": "Dublin 6W",
                "price": 2500,
                "type": "Apartment"
            },
            {
                "id": 3425,
                "bathrooms": 1,
                "bedrooms": 1,
                "location": "Dublin 8",
                "price": 2500,
                "type": "Apartment"
            }
        ]);
    });

    it('Get one listing without address', async () => {
        const parsedHtml = parse(htmlOneDoesntHaveAddress);
        const response = parsedHtml.querySelectorAll('li[data-testid^="result-"]');
        (getLatestRentalResults as jest.MockedFunction<typeof getLatestRentalResults>).mockResolvedValue(response);

        const test = await getListingsFromArea("dublin-city");

        expect(test).toStrictEqual([
            {
                "id": 3424,
                "bathrooms": 1,
                "bedrooms": 1,
                "location": undefined,
                "price": 2500,
                "type": "Apartment"
            }
        ]);
    });

    it('Get one listing without id number', async () => {
        const parsedHtml = parse(htmlOneDoesntProperId);
        (getLatestRentalResults as jest.MockedFunction<typeof getLatestRentalResults>).mockResolvedValue([parsedHtml]);

        const test = await getListingsFromArea("dublin-city");

        expect(test).toStrictEqual([
            {
                id: null,
                bathrooms: 1,
                bedrooms: 1,
                location: undefined,
                price: null,
                type: ListingType.apartment
            }
        ]);
    });
});