import {AbstractComponent} from './abstract-component.js';

export default class Stats extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<a href="#stats" class="main-navigation__item main-navigation__item--additional main-navigation__item--active">Stats</a>`;
  }
}
