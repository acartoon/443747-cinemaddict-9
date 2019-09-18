import {AbstractComponent} from './abstract-component.js';

export default class Filters extends AbstractComponent {
  constructor(title, count, link) {
    super();
    this._title = title;
    this._count = count;
    this._link = link;
  }

  getTemplate() {
    return `<a href="#${this._link}" class="main-navigation__item">${this._title} 
    <span class="main-navigation__item-count">${this._count}</span></a>`;
  }
}