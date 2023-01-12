export default function getIdFromString(idText: string | null): number | null {
    if (!idText) {
        return null;
    }

    const match = idText.trim().match(/^result-([0-9]+)$/);

    if (!match) {
        return null;
    }

    return parseInt(match[1]);
}