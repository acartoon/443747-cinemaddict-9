import {AbstractComponent} from './abstract-component';

export default class EmojiList extends AbstractComponent {
  constructor(onEmojiClick) {
    super();
  }

  getTemplate() {
    return `<div class="film-details__emoji-list"></div>`;
  }
}
