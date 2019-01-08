let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default class Positioner {
    constructor (rows, columns) {
        this.rows = rows;
        this.columns = columns;
    }

    set rows (rows) {
        this._rows = rows;
    }

    get rows () {
        return this._rows;
    }

    set columns (columns) {
        this._columns = columns;
    }

    get columns () {
        return this._columns;
    }

    convert (position) {
        let responsivePositions = this.responsive(position);

        Object.keys(responsivePositions).forEach(responsive => {
            if (responsivePositions[responsive] !== null) {
                responsivePositions[responsive] = this.convertArea(responsivePositions[responsive]);
            }
        });

        return responsivePositions;
    }

    convertArea (area) {
        let [
            start,
            end,
        ] = area.split('/');

        area = {
            start: this.convertPosition(
                this.defaultPosition(start || '', end || '', true),
                true
            ),
            end: this.convertPosition(
                this.defaultPosition(end || '', start || '', false),
                false
            ),
        };

        area.length = {
            row: area.end.row - area.start.row,
            column: area.end.column - area.start.column,
        };

        return area;
    }

    convertPosition (position, isStart) {
        let matches = position.match(/^([a-z]+)([0-9]+)$/i);

        if (!matches) {
            return {};
        }

        return {
            row: Number(matches[2]) + (isStart ? 0 : 1),
            column: this.charactersToInteger(matches[1]) + (isStart ? 0 : 1),
        };
    }

    defaultPosition (position, other, isStart) {
        if (position.length === 2) {
            return position;
        }

        if (position === '') {
            if (other.length > 1) {
                return other;
            }

            if (isStart) {
                return 'a1';
            }

            if (Number.isInteger(Number(other))) {
                return this.integerToCharacters(this.columns) + other;
            }

            return other + this.rows;
        }

        if (Number.isInteger(Number(position))) {
            return (isStart ? 'a' : this.integerToCharacters(this.columns)) + position;
        }

        return position + (isStart ? '1' : this.rows);
    }

    responsive (position) {
        let responsive = {
            all: null,
            sm: null,
            md: null,
            lg: null,
            xl: null,
        };

        position.split(' ')
            .forEach(responsivePosition => {
                let positionItems = responsivePosition.split(':');

                if(Object.keys(responsive).includes(positionItems[0])) {
                    responsive[positionItems[0]] = positionItems[1];
                } else {
                    responsive.all = responsivePosition;
                }
            });

        if (responsive.all === null) {
            Object.keys(responsive).some(key => {
                if (responsive[key] === null) {
                    return false;
                }

                responsive.all = responsive[key];

                return true;
            });
        }

        let last = null;
        Object.keys(responsive).forEach(key => {
            if (responsive[key] === null) {
                responsive[key] = last;
            }

            last = responsive[key];
        });

        return responsive;
    }

    charactersToInteger (characters) {
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
    }

    integerToCharacters (integer) {
        let dividend = integer;
        let columnName = '';
        while (dividend > 0) {
            let modulo = (dividend - 1) % 26;
            columnName = letters[modulo] + columnName;
            dividend = Math.floor((dividend - modulo) / 26);
        }

        return columnName.toLowerCase();
    }
}
