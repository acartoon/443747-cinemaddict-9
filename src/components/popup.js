import {AbstractComponent} from './abstract-component.js';


export class Popup extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="film-details"></section>`;
  }

  // onClosePopup() {
  //   this.getElement()
  // }
}
