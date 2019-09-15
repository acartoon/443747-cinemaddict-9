import {AbstractComponent} from './abstract-component.js';

export default class NewComment extends AbstractComponent{
 
  getTemplate() {
    return `<div class="film-details__new-comment"></div>`
  }
}
