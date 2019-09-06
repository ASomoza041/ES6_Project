import { BackgroundPane } from "./background-pane";
import { SimpleComponent } from "../libs/simple-component";

// we use the notice to display any special messages to the user. 
//We create the background pane, the message, then have a time interval to have it auto destroy itself.

export class Notice extends SimpleComponent {
    constructor(text, interval = 1000) {
        super("notice");

        //Check to see if there's already a message and delete it before putting a new one.
        let element = document.querySelector(this.selector);
        if(element) this.removeElements();

        this.element.setAttribute(
            "style",
            "position: absolute; top: 20%; background-color: white; z-index: 11;" +
              "text-align: center; font-family: Monospace; font-size: 25px; width: 100%;"
          );
          this.element.textContent = text;
          this.backgroundPane = new BackgroundPane();

          document.body.appendChild(this.backgroundPane.element);
          document.body.appendChild(this.element);

          setTimeout(() => this.removeElements(), interval);
    }
    removeElements() {
        this.backgroundPane.destroy();
        this.destroy();
      }
}