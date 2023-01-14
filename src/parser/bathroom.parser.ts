export default function getBathroomsFromString(bathroomText: string | null): number | null {
    if (!bathroomText) {
        return null;
    }

    const match = bathroomText.trim().match(/^([0-9]+) bath$/i);

    if (!match) {
        return null;
    }

    return parseInt(match[1]);
}