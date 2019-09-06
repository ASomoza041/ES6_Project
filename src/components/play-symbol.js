import {
    WritableComponent
} from "../libs/writable-component";

//this class shows whos turn it is (X or O).
export class PlaySymbol extends WritableComponent {
    constructor() {
        super("symbol");
        this.element.setAttribute("style", "float: right");
    }
    set textContent(v) {
        super.textContent = `playing: ${v}`;
    }
}