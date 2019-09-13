import {FilmBaseComponent} from './film-base-component.js';
import {descriptionTrim} from '../utils';

export class Film extends FilmBaseComponent {
  constructor(params, onEscKeyDown, renderFilmDetails, onDataChange) {
    super(params);
    this._onEscKeyDown = onEscKeyDown;
    this._renderPopup = renderFilmDetails;
    this._onDataChange = onDataChange;

    this._init();
  }
  
  _init() {
    this._onRenderPopup(`.film-card__poster`);
    this._onRenderPopup(`.film-card__title`);
    this._onRenderPopup(`.film-card__comments`);
    this._onFilmControlClick(`.film-card__controls-item--add-to-watchlist`);
    this._onFilmControlClick(`.film-card__controls-item--mark-as-watched`);
    this._onFilmControlClick(`.film-card__controls-item--favorite`);
    // this._description = descriptionTrim(this._description);
  }

  _onRenderPopup(selector) {
    this.getElement()
      .querySelector(selector)
      .addEventListener(`click`, () => {
        this._renderPopup();
        document.addEventListener(`keydown`, this._onEscKeyDown);
      });
  };

  _onFilmControlClick(selector) {
    this.getElement()
    .querySelector(selector)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.getElement().querySelector(selector).classList.toggle(`film-card__controls-item--active`);
      this._onDataChange();
    });
  }

  getTemplate() {
    return `<article class="film-card">
    <h3 class="film-card__title">${this._name}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._releaseDate}</span>
      <span class="film-card__duration">${this._runtime}</span>
      <span class="film-card__genre">${this._genres[0]}</span>
    </p>
    <img src="${this._poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionTrim(this._description)}</p>
    <a class="film-card__comments">${this._comments.amount} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._watched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${this._favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
    </form>
  </article>`;
  }
}
