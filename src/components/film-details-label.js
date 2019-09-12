import {AbstractComponent} from './abstract-component.js';

export default class FilmDetailsLabel extends AbstractComponent {
  constructor(name) {
    super();
    this._name = name;
  }

  getTemplate() {
    return `<label for="${this._name}" class="film-details__control-label film-details__control-label--${this._name}">Add to watchlist</label>`;
  }
}
