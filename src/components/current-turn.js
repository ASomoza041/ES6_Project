import {
    WritableComponent
} from "../libs/writable-component";

//this class holds the current turn number.
export class CurrentTurn extends WritableComponent {
    constructor() {
        super("CurrentTurn");
        this.element.setAttribute("style", "float: left");
    }

    set textContent(v) {
        super.textContent = `turn No: ${v}`;
    }
}