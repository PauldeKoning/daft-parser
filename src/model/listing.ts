export interface Listing {
    id: number | null;
    price: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    type?: ListingType;
    location?: ListingLocation;
}

export enum ListingType {
    house = "House",
    apartment = "Apartment",
    studio = "Studio"
}

export enum ListingLocation {
    D01 = "Dublin 1",
    D02 = "Dublin 2",
    D03 = "Dublin 3",
    D04 = "Dublin 4",
    D05 = "Dublin 5",
    D06 = "Dublin 6",
    D06W = "Dublin 6W",
    D07 = "Dublin 7",
    D08 = "Dublin 8",
    D09 = "Dublin 9",
    D10 = "Dublin 10",
    D11 = "Dublin 11",
    D12 = "Dublin 12",
    D13 = "Dublin 13",
    D14 = "Dublin 14",
    D15 = "Dublin 15",
    D16 = "Dublin 16",
    D17 = "Dublin 17",
    D18 = "Dublin 18",
    D20 = "Dublin 20",
    D22 = "Dublin 22",
    D24 = "Dublin 24",
    DRest = "Dublin (Other)"
}