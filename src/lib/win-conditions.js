import {
    createSquare
} from "./map";

export class WinCondition {
    constructor(field = createSquare(3)) {
        this.field = field;
    }
    //iterate through the rows and check if the columns holds the same symbol
    horizontalLine(symbol) {
        let inspectingRow = [];
        return (
            this.field.some(row => {
                inspectingRow = row;
                return row.every(slot => slot.occupied && slot.symbol == symbol);
            }) && inspectingRow
        );
    }
    //Check if any row has a column filled with one symbol.
    verticalLine(symbol) {
        return this.field.some((row, index) => {
            let inspectingColumn = [];
            for (let x = this.field.length - 1; x > -1; x--) {
                inspectingColumn.push(this.field[x][index]);
            }
            return (
                inspectingColumn.every(
                    slot => slot.occupied && slot.symbol == symbol
                ) && inspectingColumn
            );
        });
    }
    //ALEX's NOTE!: It's midnight and I actually have no clue exactly what this means. All I know is that this checks for diagonal win conditions.
    //"if the sum (or subtraction) of the row you are at and the length of the field is not equal to the length of the field (or 0, in case of subtracting) that diagonal is not a win conditional." - tutorial
    diagonalLine(symbol) {
        const length = this.field.length - 1;
        const middle = length / 2;

        //first checks if the middle and a corner are unoccupied. If thats true then we assume there's no win availiable and return false.
        if (
            !this.field[middle][middle].occupied &&
            (!this.field[length][0].occupied || !this.field[0][0].occupied)
        )
            return false;

        //now we check which column is occupied and which symbol it has so we can "tranverse its diagonal".
        let column =
            this.field[0][0].occupied && this.field[0][0].symbol === symbol ?
            0 :
            this.field[0][length].occupied &&
            this.field[0][length].symbol === symbol ?
            length :
            false;

        //We assigned our column to a number. We now check if the corners are unoccupied, returning false.
        if (typeof column !== "number") return false;

        //if they dont return false, then we must traverse the diagonal. First figuring out if we must increment or decrement.
        let inspectingDiagonal = [];
        let row = 0;
        if (column === 0) {
            for (column; column <= length; column++) {
                inspectingDiagonal.push(this.field[row][column]);
                row++;
            }
        } else {
            for (column; column >= 0; column--) {
                inspectingDiagonal.push(this.field[row][column]);
                row++;
            }
        }

        //if every item in the temporary array passes the tests, we have a win.
        return (
            inspectingDiagonal.every(
                slot => slot.occupied && slot.symbol == symbol
            ) && inspectingDiagonal
        );
    }

    //if every slot is filled but no winner is called, we can call a tie.
    get tieExists() {
        const flatten = arr =>
            arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
        const flattenedField = flatten(this.field);
        return flattenedField.every(slot => slot.occupied === true);
    }
    //alias for each usage
    hasLine(symbol) {
        return (
            this.horizontalLine(symbol) ||
            this.verticalLine(symbol) ||
            this.diagonalLine(symbol)
        );
    }
}