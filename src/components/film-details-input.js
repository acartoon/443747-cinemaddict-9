import {AbstractComponent} from './abstract-component.js';

export default class FilmDetailsInput extends AbstractComponent {
  constructor(name, controls) {
    super();
    this._name = name;
    this._controls = controls;
  }

  getTemplate() {
    return `<input type="checkbox" class="film-details__control-input visually-hidden" id="${this._name}" name="${this._name}" ${this._controls ? `checked` : ``}>`;
  }
  
}
