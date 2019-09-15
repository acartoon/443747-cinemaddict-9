import {AbstractComponent} from './abstract-component';
import UserRatingScore from './user-rating-score';
import {render, Position} from '../utils';

export default class FormDetailsRating extends AbstractComponent {
  constructor(poster, name, rating, onDataChange) {
    super();
    this._poster = poster;
    this._name = name;
    this._rating = rating;
    this._onDataChange = onDataChange;
    this._userRatingScore = new UserRatingScore(this._rating, this._onDataChange);

    this._init();
  }

  _init() {
    render(this.getElement().querySelector(`.film-details__user-rating-inner`), this._userRatingScore.getElement())
  }

  getTemplate() {
    return `<section class="film-details__user-rating-wrap">
    <div class="film-details__user-rating-controls">
      <button class="film-details__watched-reset" type="button">Undo</button>
    </div>

    <div class="film-details__user-score">
      <div class="film-details__user-rating-poster">
        <img src="${this._poster}" alt="film-poster" class="film-details__user-rating-img">
      </div>

      <section class="film-details__user-rating-inner">
        <h3 class="film-details__user-rating-title">${this._name}</h3>

        <p class="film-details__user-rating-feelings">How you feel it?</p>

      </section>
    </div>
  </section>`;
  }
}
