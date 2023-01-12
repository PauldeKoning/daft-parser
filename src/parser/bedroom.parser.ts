export default function getBedroomsFromString(bedroomText: string | null): number | null {
    if (!bedroomText) {
        return null;
    }

    const match = bedroomText.trim().match(/^([0-9]+) bed$/i);

    if (!match) {
        return null;
    }

    return parseInt(match[1]);
}