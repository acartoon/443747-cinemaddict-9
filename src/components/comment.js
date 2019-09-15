import {AbstractComponent} from './abstract-component.js';
import moment from 'moment'


export default class CommentsList extends AbstractComponent {
  constructor(emojis, text, author, date) {
    super();
    this._emojis = emojis;
    this._text = text;
    this._author = author;
    this._date = date;

  }

  getTemplate() {
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${this._emojis}.png" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">${this._text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${this._author}</span>
        <span class="film-details__comment-day">${moment(this._date).fromNow()}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  }
}
