import {getListingsFromArea} from "./parser/listing.parser";
import {APIGatewayProxyResult} from "aws-lambda";

export const handler = async (event: {
    area: string
}): Promise<APIGatewayProxyResult> => {
    console.log('test mens');

    console.log(event);

    if (!event.area) {
        return {
            body: JSON.stringify({
                msg: "Area is not defined",
            }),
            statusCode: 400,
        }
    }

    const allowedAreas = ['dublin-city'];

    if (!allowedAreas.includes(event.area)) {
        return {
            body: JSON.stringify({
                msg: "Area is not allowed",
            }),
            statusCode: 400,
        }
    }

    return {
        body: JSON.stringify({
            listings: await getListingsFromArea(event.area)
        }),
        statusCode: 400,
    }
}