import {AbstractComponent} from './abstract-component.js';

export default class FormDetailsMiddle extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<div class="form-details__middle-container">
    </div>`;
  }
}
