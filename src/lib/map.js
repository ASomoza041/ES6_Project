//This will create squares for our game board.
export function makeSquare(height) {
    //Here we are setting the default size to 3x3
    const AllRows = height || 3;
    const AllColumns = height || 3;
    const field = [];
    for (let r = 0; r < AllRows; r++) {
        let singleRow = [];
        for (let c = 0; c < AllColumns; c++) {
            //Row/column information is set in slot so we can return an array of slots for win conditions.
            let slot = { occupied: false, symbol: "", row: r, column: c };
            singleRow.push(slot);
        }
        field.push(singleRow);
    }
    return field;
}