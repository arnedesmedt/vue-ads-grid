let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default class Positioner {
    constructor (rows, columns, rowGap, columnGap) {
        this.rows = rows;
        this.columns = columns;
        this.rowGap = rowGap;
        this.columnGap = columnGap;
    }

    set rows (rows) {
        this._rows = this.responsive(rows);
    }

    get rows () {
        return this._rows;
    }

    set columns (columns) {
        this._columns = this.responsive(columns);
    }

    get columns () {
        return this._columns;
    }

    set rowGap (rowGap) {
        this._rowGap = this.responsive(rowGap);
    }

    get rowGap () {
        return this._rowGap;
    }

    set columnGap (columnGap) {
        this._columnGap = this.responsive(columnGap);
    }

    get columnGap () {
        return this._columnGap;
    }

    set windowSize (windowSize) {
        this._windowSize = windowSize;
    }

    get windowSize () {
        return this._windowSize;
    }

    convert (position) {
        let responsivePositions = this.responsive(position, false);

        Object.keys(responsivePositions)
            .filter(responsive => responsivePositions[responsive])
            .forEach(responsive => {
                responsivePositions[responsive] = this.convertArea(responsivePositions[responsive]);
            });

        this.fillResponsive(responsivePositions);

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
                return this.integerToCharacters(this.columns[this.windowSize]) + other;
            }

            return other + this.rows[this.windowSize];
        }

        if (Number.isInteger(Number(position))) {
            return (isStart ? 'a' : this.integerToCharacters(this.columns[this.windowSize])) + position;
        }

        return position + (isStart ? '1' : this.rows[this.windowSize]);
    }

    responsive (group, fill = true) {
        let responsive = {
            all: null,
            sm: null,
            md: null,
            lg: null,
            xl: null,
        };

        group.split(' ')
            .forEach(responsiveItem => {
                let parts = responsiveItem.split(':');

                if(Object.keys(responsive).includes(parts[0])) {
                    responsive[parts[0]] = parts[1];
                } else {
                    responsive.all = responsiveItem;
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

        if (fill) {
            this.fillResponsive(responsive);
        }

        return responsive;
    }

    fillResponsive (responsive) {
        let last = null;
        Object.keys(responsive).forEach(key => {
            if (responsive[key] === null) {
                responsive[key] = last;
            }

            last = responsive[key];
        });
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
