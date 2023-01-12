export default function getPriceNumberFromString(priceText: string | null): number | null {
    if (!priceText) {
        return null;
    }

    const match = priceText.trim().match(/^€([0-9,]+) per (month|week)$/);

    if (!match) {
        return null;
    }

    const price = parseInt(match[1].replaceAll(',', ''));

    if (!price) {
        return null;
    }

    return getMonthlyPrice(price, match[2]);
}

function getMonthlyPrice(price: number, period: string): number | null {
    if (period === 'week') {
        return price * 4;
    }

    if (period === 'month') {
        return price;
    }

    /* istanbul ignore next */
    return null;
}