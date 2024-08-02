import {jest} from '@jest/globals'

import {getListingsFromArea} from "../../src/parser/listing.parser";

import {getLatestRentalResults} from "../../src/result.fetcher";
import {parse} from "node-html-parser";

jest.mock("../../src/result.fetcher");

const htmlMultiple = "<ul>" +
    "<li data-testid='result-3424'>" +
    "<div data-tracking='srp_price'>€2,500 per month</div>" +
    "<div data-tracking='srp_address'>Dublin 6W</div>" +
    "<div data-tracking='srp_meta'>" +
    "<div><div>" +
    "<span>8 Bed</span>" +
    "<span>4 Bath</span>" +
    "<span>Apartment</span>" +
    "</div></div>" +
    "</div>" +
    "</li>" +
    "<li data-testid='result-3425'>" +
    "<div data-tracking='srp_price'>€2,500 per month</div>" +
    "<div data-tracking='srp_address'>Dublin 8</div>" +
    "<div data-tracking='srp_meta'>" +
    "<div><div>" +
    "<span>7 Bed</span>" +
    "<span>3 Bath</span>" +
    "<span>House</span>" +
    "</div></div>" +
    "</div>" +
    "</li>" +
    "</ul>";

const htmlOneDoesntHaveAddress = "<ul>" +
    "<li data-testid='result-3424'>" +
    "<div data-tracking='srp_price'>€2,500 per month</div>" +
    "<div data-tracking='srp_meta'>" +
    "<div><div>" +
    "<span>7 Bed</span>" +
    "<span>3 Bath</span>" +
    "<span>Apartment</span>" +
    "</div></div>" +
    "</div>" +
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
                "bathrooms": 4,
                "bedrooms": 8,
                "location": "Dublin 6W",
                "price": 2500,
                "type": "Apartment"
            },
            {
                "id": 3425,
                "bathrooms": 3,
                "bedrooms": 7,
                "location": "Dublin 8",
                "price": 2500,
                "type": "House"
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
                "bathrooms": 3,
                "bedrooms": 7,
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
                bathrooms: null,
                bedrooms: null,
                location: undefined,
                price: null,
                type: null
            }
        ]);
    });
});