
import {AbstractComponent} from './abstract-component';
import Comment from './comment';
import CommentsList from './comments-list';
import {render, emoji, key} from '../utils';
import EmojiList from './emoji-list';
import NewComment from './new-comment';
import AddEmojiLabel from './add-emoji-label';
import FilmCommentInput from './film-comment-input';
import EmojiItem from './emoji-item';
import EmojLabel from './emoji-label';

export default class FormDetailsComments extends AbstractComponent {
  constructor(comments, onSendMsg, onEscKeyDown) {
    super();
    this._comments = comments;
    this._onSendMsg = onSendMsg;
    this._onEscKeyDown = onEscKeyDown;
    this._count = this._comments.length;
    this._commentsList = new CommentsList();
    this.test = new Comment();
    this._emojiList = new EmojiList();
    this._newComment = new NewComment();
    this._filmCommentInput = new FilmCommentInput();
    this._addEmojiLabel = new AddEmojiLabel();
    
    
    this._init();
  }

  getTemplate() {
    return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._count}</span></h3></section>`;
  }


  _init() {
    render(this.getElement(), this._commentsList.getElement());

    this._comments.forEach((i) => {
      let comment = new Comment(i.emojis, i.text, i.author, i.date);
      render(this._commentsList.getElement(), comment.getElement())
    })

    render(this.getElement(), this._newComment.getElement());
    render(this._newComment.getElement(), this._addEmojiLabel.getElement());
    render(this._newComment.getElement(), this._filmCommentInput.getElement());

    this._filmCommentInput.getElement()
      .addEventListener(`click`, (evt) => {
        document.addEventListener(`keydown`, this._onSendMsg);
        document.removeEventListener(`keydown`, this._onEscKeyDown);
      });
      

    Object.keys(emoji).forEach((i) => {
      let input  = new EmojiItem(i);
      let label  = new EmojLabel(i, emoji[i], this._onEmojiClick.bind(this));

      render(this.getElement(), input.getElement())
      render(this.getElement(), label.getElement())
    })

    render(this._newComment.getElement(), this._emojiList.getElement());
  }
  
  _onEmojiClick(name) {
    this._addEmojiLabel.getElement().innerHTML = `<img src="./images/emoji/${name}.png" width="55" height="55" alt="emoji">`;
  }

}
