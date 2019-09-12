import {AbstractComponent} from './abstract-component.js';

export default class FilmDetailsControlsContainer extends AbstractComponent {
  constructor(name) {
    super();
    this._name = name;
  }

  getTemplate() {
    return `<section class="film-details__controls"></section>`;
  }
}
