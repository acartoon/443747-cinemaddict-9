import {AbstractComponent} from './abstract-component.js';

export default class FilmDetailsBottom extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<div class="form-details__bottom-container"></div>`;
  }
}
