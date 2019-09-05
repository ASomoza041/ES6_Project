import { simpleComponent } from "./simple-component";
export class listComponent extends simpleComponent {
    constructor(selector) {
        super(selector);
        this.items = [];
    }

    getItem(index) {
        if(typeof index !== "number")
            throw Error("getRow must have a number as an argument");
        if(index < 0 || index > this.items.length) throw Error("Out of bounds!");
        return this.items[index];
    }
}