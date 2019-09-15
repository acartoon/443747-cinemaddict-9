import {FilmBaseComponent} from './film-base-component.js';
import {descriptionTrim, render, Position} from '../utils';
import FilmCardControls from './film-card-controls';
import FilmButton from './film-button';

export class Film extends FilmBaseComponent {
  constructor(params, onEscKeyDown, renderFilmDetails, onDataChange) {
    super(params);
    this._onEscKeyDown = onEscKeyDown;
    this._renderPopup = renderFilmDetails;
    this._onDataChange = onDataChange;
    this._filmCardControls = new FilmCardControls;
    this._watchlistControls = new FilmButton(`watchlist`, `Add to watchlist`, `film-card__controls-item--add-to-watchlist`, this._watchlist, this._onDataChange);
    this._watchedControls = new FilmButton(`watched`, `Mark as watched`, `film-card__controls-item--mark-as-watched`, this._watched, this._onDataChange);
    this._favoriteControls = new FilmButton(`favorite`, `Mark as favorite`, `film-card__controls-item--favorite`, this._favorite, onDataChange);

    this._init();
  }
  
  _init() {
    this._renderControl();
    this._onRenderPopup(`.film-card__poster`);
    this._onRenderPopup(`.film-card__title`);
    this._onRenderPopup(`.film-card__comments`);
  }

  _onRenderPopup(selector) {
    this.getElement()
      .querySelector(selector)
      .addEventListener(`click`, () => {
        this._renderPopup();
        document.addEventListener(`keydown`, this._onEscKeyDown);
      });
  };

  _renderControl() {
    render(this.getElement(), this._filmCardControls.getElement());
    render(this._filmCardControls.getElement(), this._watchlistControls.getElement());
    render(this._filmCardControls.getElement(), this._watchedControls.getElement());
    render(this._filmCardControls.getElement(), this._favoriteControls.getElement());
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
    <a class="film-card__comments">${this._comments.length} comments</a>
    </article>`;
  }
}
