import {getLatestRentalResults} from "../result.fetcher";
import {Listing} from "../model/listing";
import {HTMLElement} from "node-html-parser";
import getPriceNumberFromString from "./price.parser";
import {getLocationFromString} from "./location.parser";
import getBathroomsFromString from "./bathroom.parser";
import getBedroomsFromString from "./bedroom.parser";
import getListingTypeFromString from "./type.parser";
import getIdFromString from "./id.parser";

const priceSelector = 'div[data-testid="price"]';
const locationSelector = 'p[data-testid="address"]';
const bedsSelector = 'p[data-testid="beds"]';
const bathsSelector = 'p[data-testid="baths"]';
const propertyTypeSelector = 'p[data-testid="property-type"]';

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

    return {
        id: getIdFromString(idText),
        bathrooms: getBathroomsFromString(bathroomText),
        bedrooms: getBedroomsFromString(bedroomText),
        type: getListingTypeFromString(propertyTypeText),
        location: getLocationFromString(locationText),
        price: getPriceNumberFromString(priceText)
    }
}

function getInnerTextFromSelector(element: HTMLElement, selector: string): string | null {
    const selected = element.querySelector(selector);

    if (!selected) {
        return null;
    }

    return selected.childNodes[0].innerText;
}

function getIdStringFromListingElement(element: HTMLElement): string | null {
    const idText = element.getAttribute('data-testid');

    if (!idText) {
        return null;
    }

    return idText;
}