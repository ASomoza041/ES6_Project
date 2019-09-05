export class simpleComponent {
    //This creates the base node element for every other component in this game. So it will be appended and removed here
    constructor(selector) {
        if(!selector) 
            throw Error("a SimpleComponent must be composed of a selector");
            this.selector = selector.toString();
            this.element = document.createElement(this.selector);
    }
    //Call this to remove element from the DOM.
    destroy() {
        document.body.removeChild(this.element);
    }
}