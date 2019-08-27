import {AbstractComponent} from './abstract-component.js';

export class Films extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
