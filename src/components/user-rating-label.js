import {AbstractComponent} from './abstract-component.js';
import { get } from 'http';

export default class UserRatingLabel extends AbstractComponent {
  constructor(id, onDataChange) {
    super();
    this._id = id;
    this._onDataChange = onDataChange;

    this._onclick();
  }

  getTemplate() {
    return `<label class="film-details__user-rating-label" for="rating-${this._id}">${this._id}</label>`;
  }

  _onclick() {
    this.getElement().addEventListener(`click`, () => {
      console.log(this._id)
      this._onDataChange(this._id);
    })
  }
}
