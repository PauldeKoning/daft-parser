import {ListingType} from "../model/listing";

const listingTypeMapper: {
    [index: string]: ListingType
} = {
    "studio": ListingType.studio,
    "apartment": ListingType.apartment,
    "house": ListingType.house
}

export default function getListingTypeFromString(propertyType: string | null): ListingType | null {
    if (!propertyType) {
        return null;
    }

    const match = propertyType.trim().match(/(Studio|Apartment|House)/i);

    if (!match) {
        return null;
    }

    return listingTypeMapper[match[1].toLowerCase()];
}