import {getLatestRentalResults} from "../result.fetcher";
import {Listing, ListingType} from "../model/listing";
import {HTMLElement} from "node-html-parser";
import getPriceNumberFromString from "./price.parser";
import {getLocationFromString} from "./location.parser";
import getBathroomsFromString from "./bathroom.parser";
import getBedroomsFromString from "./bedroom.parser";
import getListingTypeFromString from "./type.parser";
import getIdFromString from "./id.parser";

const priceSelector = 'div[data-tracking="srp_price"]';
const locationSelector = 'div[data-tracking="srp_address"]';
const bedsSelector = 'div[data-tracking="srp_meta"] > div:first-of-type > div:first-of-type > span:nth-of-type(1)';
const bathsSelector = 'div[data-tracking="srp_meta"] > div:first-of-type > div:first-of-type > span:nth-of-type(2)';
const propertyTypeSelector = 'div[data-tracking="srp_meta"] > div:first-of-type > div:first-of-type > span:nth-of-type(3)';
const studioSelector = 'div[data-tracking="srp_meta"] > div:first-of-type > div:first-of-type > span:nth-of-type(1)';

export async function getListingsFromArea(area: string): Promise<Listing[]> {
    const results = await getLatestRentalResults(area);

    return results.map(result => mapResultToListing(result));
}

function mapResultToListing(result: HTMLElement): Listing {
    const priceText = getInnerTextFromSelector(result, priceSelector);
    const locationText = getInnerTextFromSelector(result, locationSelector);
    const bathroomText = getInnerTextFromSelector(result, bathsSelector);
    const bedroomText = getInnerTextFromSelector(result, bedsSelector);
    const propertyTypeText = getInnerTextFromSelector(result, propertyTypeSelector);
    const idText = getIdStringFromListingElement(result);

    const isStudio = getBooleanFromSelector(result, studioSelector, ListingType.studio);
    const location = getLocationFromString(locationText);

    return {
        id: getIdFromString(idText),
        bathrooms: !isStudio ? getBathroomsFromString(bathroomText) : undefined,
        bedrooms: !isStudio ? getBedroomsFromString(bedroomText) : undefined,
        type: !isStudio ? getListingTypeFromString(propertyTypeText) : ListingType.studio,
        location: location ? location : undefined,
        price: getPriceNumberFromString(priceText),
    }
}

function getInnerTextFromSelector(element: HTMLElement, selector: string): string | null {
    const selected = element.querySelector(selector);

    if (!selected) {
        return null;
    }

    return selected.childNodes[0].innerText;
}

function getBooleanFromSelector(element: HTMLElement, selector: string, match: string): boolean | null {
    const selected = element.querySelector(selector);

    if (!selected) {
        return false;
    }

    return selected.childNodes[0].innerText === match;
}

function getIdStringFromListingElement(element: HTMLElement): string | null {
    const idText = element.getAttribute('data-testid');

    if (!idText) {
        return null;
    }

    return idText;
}