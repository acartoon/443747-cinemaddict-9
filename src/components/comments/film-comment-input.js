import {AbstractComponent} from '../abstract-component.js';

export default class FilmCommentInput extends AbstractComponent{
  constructor(func) {
    super();
    this._func = func;
    this._onClick();
  }
 
  getTemplate() {
    return `<label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>`
  }

  _onClick() {
    this.getElement().addEventListener(`input`, () => {
      document.addEventListener(`keydown`, this._func);
    })
  }
}
