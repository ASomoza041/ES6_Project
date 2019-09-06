import {
    GameEngine
} from "../libs/game-engine";
import {
    GameField
} from "../components/game-field";
import {
    Notice
} from "../components/notice";
import {
    TurnInformation
} from "../components/turn-information";

//This class inserts all the components into the DOM. Also controls the interaction between the parts and the game engine.
export class GameHud {
    constructor() {
        this.turns = null;
        this.gameEngine = null;
        this.gameField = null;
        this.turnInfo = new TurnInformation();

        document.body.appendChild(this.turnInfo.element);
        this.createGameField(false);
    }
    createGameField(lastWinner = "x") {
        this.turns = 0;
        this.gameEngine = new GameEngine(["x", "o"], lastWinner);

        //removes old gameField compoenent to replace it with a new one.
        const oldGameField = document.querySelector("game-field");
        if (oldGameField) document.body.removeChild(oldGameField);

        //creates the new gameField component
        this.gameField = new GameField(this.gameEngine.field);

        //This click event is to make the game slots actually work
        this.gameField.items.forEach(row => {
            row.items.forEach(slot => {
                slot.element.addEventListener("click", element =>
                    this.occupyField(element)
                );
            });
        });
        document.body.appendChild(this.gameField.element);

        //gives user a notice of a new game and turn
        new Notice(`Game Start! First to Play: ${this.gameEngine.turnOf}`, 3000);
        this.turnInfo.update(this.turns, this.gameEngine.turnOf);

    }
    //gets info for game end. (winner or tie)
    get isGameEnd() {
        return this.gameEngine.isWinner || this.gameEngine.isTie;
    }

    //Shows game end notices and resets game.
    processGameEnd() {
        let winner = false;
        if (this.gameEngine.isWinner) {
            new Notice(
                `Game End! Winner is ${this.gameEngine.turnOf}! Game took ${
              this.turns
            } turns`,
                1500
            );
            winner = this.gameEngine.turnOf;
        } else if (this.gameEngine.isTie) {
            new Notice(`Game End! It's a Tie! Game took ${this.turns} turns`, 1500);
        }
        setTimeout(() => {
            this.createGameField(winner);
        }, 1500);
    }

    //occupy field clicked by updating the interface by getting the information of the slotclicked and sending it to the game engine.
    //We let the user know if the move theyre trying to do is impossible, we check and let the user know if the game is over, if not we update the turns and toggle the symbol.
    occupyField(element) {
        let coords = {
            row: parseInt(element.target.getAttribute("slot-row"), 10),
            column: parseInt(element.target.getAttribute("slot-column"), 10)
        };

        let turnAction = this.gameEngine.occupyField(coords);
        if (!turnAction) {
            new Notice("This field is already occupied");
            return;
        }
        this.turns++;

        if (this.isGameEnd) {
            this.processGameEnd();
        } else {
            this.gameEngine.toggleTurn();
            this.turnInfo.update(this.turns, this.gameEngine.turnOf);
        }

        this.gameField
            .getItem(turnAction.row)
            .getItem(turnAction.column).textContent = turnAction;
    }
}