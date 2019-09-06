import {
    writableComponent
} from "../libs/writable-component";

// GameSlot is in charge on maintaining visual correlation between the game engine and the game hud.
export class GameSlot extends writableComponent {
// This class takes slot as an argument. This sets up for what slot will have: populated with
 //{row: number, column: number} and a symbol property.
 constructor(slot) {
     super("game-slot");
     //by calling the super class we can use the setAttribute().
     this.element.setAttribute(
        "style",
        "height: 60px; width: 60px; background-color: grey; display: inline-block; " +
         "border: 1px solid black; margin: 5px; font-size: large; color: black; line-height: 60px;" +
         "text-align: center; cursor: pointer"
       );

       this.element.setAttribute("slot-row", slot.row);
       this.element.setAttribute("slot-column", slot.column);
       this.element.textContent = "-";
    }

    //overwrtiting the base class method
    set textContent(slot) {
        super.textContent = slot.symbol;
        this.element.style.backgroundColor = "white";
    }
}