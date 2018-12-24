let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default {
    charactersToInteger: characters => {
        return characters.split('')
            .reduce(
                (result, char, key) => {
                    return result +
                        Math.pow(
                            letters.length,
                            characters.length - key - 1
                        ) *
                        (letters.indexOf(char.toUpperCase()) + 1);
                },
                0
            );
    },

    integerToCharacters: integer => {
        let dividend = integer;
        let columnName = '';
        while (dividend > 0) {
            let modulo = (dividend - 1) % 26;
            columnName = letters[modulo] + columnName;
            dividend = Math.floor((dividend - modulo) / 26);
        }

        return columnName.toLowerCase();
    },
};
