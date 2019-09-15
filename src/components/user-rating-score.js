import {AbstractComponent} from './abstract-component';
import FilmDetailsInput from './user-details-input';
import FilmDetailsLabel from './user-rating-label';
import { render } from '../utils';

export default class UserRatingScore extends AbstractComponent {
  constructor(data, onDataChange) {
    super();
    this._data = data;
    this._onDataChange = onDataChange;

    this._init();
  }
  
    getTemplate() {
      return `<div class="film-details__user-rating-score">
      </div>`;
    }

  _init() {
    for(let i = 1; i < 10; i++) {
      const filmDetailsInput = new FilmDetailsInput(i, this._data)
      const filmDetailsLabel = new FilmDetailsLabel(i, this._onDataChange)

      render(this.getElement(), filmDetailsInput.getElement())
      render(this.getElement(), filmDetailsLabel.getElement())
    }
  }

}
