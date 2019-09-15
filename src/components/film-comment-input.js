import {AbstractComponent} from './abstract-component.js';

export default class FilmCommentInput extends AbstractComponent{
 
  getTemplate() {
    return `<label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>`
  }
}
