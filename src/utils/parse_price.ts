export default function parsePrice(price: number | undefined): string | undefined {
    if (!price) {
        return undefined;
    }
    let priceString = price.toString();
    // Reverse the string
    const reversedString = priceString.split("").reverse().join("");

    // Add commas every 3 characters (except the first)
    let formattedPrice = "";
    for (let i = 0; i < reversedString.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedPrice += ",";
        }
        formattedPrice += reversedString[i];
    }

    // Reverse the formatted string back to normal order
    return formattedPrice.split("").reverse().join("");
}