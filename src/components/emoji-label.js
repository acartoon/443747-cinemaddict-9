import {AbstractComponent} from './abstract-component.js';

export default class EmojiLabel extends AbstractComponent {
  constructor(id, name, onDataChange) {
    super();
    this._id = id;
    this._name = name;
    this._onDataChange = onDataChange;

    this._onClick();
  }


  getTemplate() {
    return `<label class="film-details__emoji-label" for="emoji-${this._id}">
      <img src="./images/emoji/${this._name}.png" width="30" height="30" alt="emoji">
      </label>`;
  }

  _onClick() {
    this.getElement().addEventListener(`click`, () => {
      this._onDataChange(this._name)
    })
  }
}
