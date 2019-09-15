import {AbstractComponent} from './abstract-component.js';

export default class UserDetailsInput extends AbstractComponent {
  constructor(id, data) {
    super();
    this._id = id;
    this._data = data;
  }

  getTemplate() {
    return `<input type="radio" 
    name="score" 
    class="film-details__user-rating-input visually-hidden" 
    value="${this._id}" 
    id="rating-${this._id}" 
    ${this._id == this._data ? `checked` : ``}>`
  }
}
