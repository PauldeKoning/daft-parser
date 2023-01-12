import {Listing} from "./model/listing";
import {getListingsFromArea} from "./parser/listing.parser";

(async () => {
    const listings: Listing[] = await getListingsFromArea('dublin-city');

    console.log(listings);

    const listingsWithPrice = listings.filter(listing => listing.price !== null);

    const totalPrice = getTotalListingPrice(listingsWithPrice);
    const averagePrice = totalPrice / listingsWithPrice.length;

    console.log(listingsWithPrice);
    console.log(averagePrice);
})();

function getTotalListingPrice(listings: Listing[]): number {
    let totalPrice = 0;
    listings.forEach(listing => totalPrice += listing.price || 0);
    return totalPrice;
}