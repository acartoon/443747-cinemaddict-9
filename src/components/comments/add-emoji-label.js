import {AbstractComponent} from '../abstract-component.js';

export default class AddEmojiLabel extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<div for="add-emoji" class="film-details__add-emoji-label"></div>`;
  }
}
