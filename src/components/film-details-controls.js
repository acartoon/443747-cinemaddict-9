import {AbstractComponent} from './abstract-component.js';

export default class FilmDetailsControls extends AbstractComponent{
  constructor(watched, watchlist, favorite, onDataChange) {
    super();
    this._watched = watched;
    this._watchlist = watchlist;
    this._favorite = favorite;
    this._onDataChange = onDataChange;

    this._init();
  }
  
  getTemplate() {
    return `<section class="film-details__controls">
    <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._watchlist ? `checked` : ``}>
    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._watched ? `checked` : ``}>
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._favorite ? `checked` : ``}>
    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
  </section>`
  }

  _init() {
    this._onChangeControls(`watchlist`);
    this._onChangeControls(`watched`);
    this._onChangeControls(`favorite`);
  }

  _onChangeControls(checkbox) {
    const selector = `.film-details__control-label--${checkbox}`;
    this.getElement()
      .querySelector(selector)
        .addEventListener(`click`, (evt) => {
          const target = evt.target.getAttribute(`for`);
          this._onDataChange(target);
        });
  }
}
