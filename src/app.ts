import { Listing } from "./model/listing";
import {getListingsFromArea} from "./parser/listing.parser";

export const getDaftListings = async (event: {
    area: string
}): Promise<Listing[] | undefined> => {
    if (!event.area) {
        return;
    }

    const allowedAreas = ['dublin-city'];

    if (!allowedAreas.includes(event.area)) {
        return;
    }

    return await getListingsFromArea(event.area);
}