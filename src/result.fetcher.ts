import {HTMLElement, parse} from "node-html-parser";
import fetch from "node-fetch-commonjs";

const rentType = 'property-for-rent';
const resultSelector = 'li[data-testid^="result-"]';

export async function getLatestRentalResults(area: string): Promise<HTMLElement[]> {
    return await getLatestResults(rentType, area);
}

async function getLatestResults(type: string, area: string): Promise<HTMLElement[]> {
    const request = await fetch(`https://www.daft.ie/${type}/${area}?sort=publishDateDesc&firstPublishDate_from=now-1d`);
    const html = await request.text();

    return getResults(parse(html));
}

function getResults(html: HTMLElement): HTMLElement[] {
    return html.querySelectorAll(resultSelector);
}