import { simpleComponent } from "./simple-component";

//Writable class holds an alias property to change the elements' text content.
export class writingComponent extends simpleComponent {
    constructor(selector) {
        super(selector);
    }

    //sets function as getter. use this as writableComponent.textContent
    get textContent() {
        return this.element.textContent;
    }

    //sets function as setter. Makes it so you can set it to a value. writableComponent.textContent = "some value"
    set textContent(x) {
        return (this.element.textContent = x);
    }
}



