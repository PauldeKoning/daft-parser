import {jest} from "@jest/globals";
import fetch from "node-fetch-commonjs";
import {getLatestRentalResults} from "../src/result.fetcher";
import {HTMLElement} from "node-html-parser";

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

describe('Get response from fetch', () => {
    it('Should give HTML array', async () => {
        const response = new Response(htmlMultiple);
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(response);

        const results = await getLatestRentalResults('dublin-city');

        expect(results).toBeInstanceOf(Array);
        expect(results[0]).toBeInstanceOf(HTMLElement);
        expect(results[1]).toBeInstanceOf(HTMLElement);
    });
});