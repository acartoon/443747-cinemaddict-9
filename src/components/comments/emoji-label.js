import {AbstractComponent} from '../abstract-component.js';

export default class EmojiLabel extends AbstractComponent {
  constructor(id, name, onEmojiClick) {
    super();
    this._id = id;
    this._name = name;
    this._onEmojiClick = onEmojiClick;

    this._onClick();
  }


  getTemplate() {
    return `<label class="film-details__emoji-label" for="emoji-${this._id}">
      <img src="${this._name}" width="30" height="30" alt="emoji">
      </label>`;
  }

  _onClick() {
    this.getElement().addEventListener(`click`, () => {
      this._onEmojiClick(this._name)
    })
  }
}
