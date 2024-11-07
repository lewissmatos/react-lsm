const CurrencyParser = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const valueToCurrency = (value: string | number) => {
    const valueStr = value.toString();
    if (/[^0-9.]/.test(valueStr)) {
        throw new Error("Invalid value: input contains non-numeric characters.");
    }
    return CurrencyParser.format(Number(value));
};