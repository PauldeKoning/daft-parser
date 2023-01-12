import {ListingLocation} from "../model/listing";

const mappings: {
    [index: string]: ListingLocation
} = {
    "Dublin 1": ListingLocation.D01,
    "Dublin 2": ListingLocation.D02,
    "Dublin 3": ListingLocation.D03,
    "Dublin 4": ListingLocation.D04,
    "Dublin 5": ListingLocation.D05,
    "Dublin 6": ListingLocation.D06,
    "Dublin 6W": ListingLocation.D06W,
    "Dublin 7": ListingLocation.D07,
    "Dublin 8": ListingLocation.D08,
    "Dublin 9": ListingLocation.D09,
    "Dublin 10": ListingLocation.D10,
    "Dublin 11": ListingLocation.D11,
    "Dublin 12": ListingLocation.D12,
    "Dublin 13": ListingLocation.D13,
    "Dublin 14": ListingLocation.D14,
    "Dublin 15": ListingLocation.D15,
    "Dublin 16": ListingLocation.D16,
    "Dublin 17": ListingLocation.D17,
    "Dublin 18": ListingLocation.D18,
    "Dublin 20": ListingLocation.D20,
    "Dublin 22": ListingLocation.D22,
    "Dublin 24": ListingLocation.D24
}

export function getLocationFromString(locationStr: string | null): ListingLocation | null {
    if (!locationStr) {
        return null
    }

    const match = locationStr.match(/Dublin [0-9]+W?/gi);

    if (!match) {
        return getDublinRest(locationStr);
    }

    const location = mappings[match[0]];

    if (location === undefined) {
        return null;
    }

    return location;
}

function getDublinRest(locationStr: string): ListingLocation | null {
    const match = locationStr.match(/Co. Dublin/gi);

    if (!match) {
        return null;
    }

    return ListingLocation.DRest;
}