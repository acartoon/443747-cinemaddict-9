import {AbstractComponent} from './abstract-component.js';

export default class MainNav extends AbstractComponent {
  getTemplate() {
    return `<nav class="main-navigation"></nav>`;
  }
}
