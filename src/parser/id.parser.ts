export default function getIdFromString(idText: string | null): number | null {
    if (!idText) {
        return null;
    }

    return parseInt(idText.substring(7));
}