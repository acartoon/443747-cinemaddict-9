import {AbstractComponent} from './abstract-component.js';

export default class EmojiItem extends AbstractComponent {
  constructor(id) {
    super();
    this._id = id;
  }


  getTemplate() {
    return `<input class="film-details__emoji-item visually-hidden" 
    name="comment-emoji" type="radio" 
    id="emoji-${this._id}" value="${this._id}">`;
  }
}
