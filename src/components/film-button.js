import {AbstractComponent} from './abstract-component.js';

export default class FilmButton extends AbstractComponent{
  constructor(type, title, selector, data, onDataChange) {
    super();
    this._type = type;
    this._title = title;
    this._selector = selector;
    this._data = data;
    this._onDataChange = onDataChange;

    this._callback();
  }
  
  getTemplate() {
    return `<button class="film-card__controls-item button ${this._selector} ${this._data ? `film-card__controls-item--active` : ``}">${this._title}</button>`
  }

  _callback() {
    this.getElement()
      .addEventListener(`click`, (e) => {
        e.preventDefault();
        this.getElement().classList.toggle(`film-card__controls-item--active`);
        this._onDataChange(this._type);
      });
  }
}
