import {jest} from '@jest/globals'

import {getListingsFromArea} from "../../src/parser/listing.parser";
import fetch from "node-fetch-commonjs";
// @ts-ignore
const {Response} = jest.requireActual('node-fetch-commonjs');

jest.mock('node-fetch-commonjs');

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

describe('Test listings', () => {
    it('Get two correct listings from website', async () => {

        const response = new Response(htmlMultiple);
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(response);

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

        const response = new Response(htmlOneDoesntHaveAddress);
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(response);

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
});