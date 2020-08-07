export const getEnumValues = (inputEnum): string[] => {
    const values: Array<string> = [];

    for (const [key, value] of Object.entries(inputEnum)) {
        values.push(<string>value);
    }

    return values;
}