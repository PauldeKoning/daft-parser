import {ListingType} from "../model/listing";

export default function getListingTypeFromString(propertyType: string | null): ListingType {
    return ListingType.apartment;
}