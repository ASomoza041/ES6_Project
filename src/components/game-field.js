import { GameRow } from "./game-row";
import { ListComponent } from "../libs/list-component";

//GameField is responsible for creating the actual elements of the game. To do with were iterating 
//over the field provided to us by the engine and create its rows and columns with GameRow and GameSlot
export class GameField extends ListComponent {
    constructor(field) {
        super("game-field");
        let gameRow;
        this.items = [];
        this.element.setAttribute(
            "style",
            "font-family: Monospace; text-align: center"
          );

          field.forEach(row => {
            gameRow = new GameRow(row);
            this.element.appendChild(gameRow.element);
            this.items.push(gameRow);
          });
    }
}