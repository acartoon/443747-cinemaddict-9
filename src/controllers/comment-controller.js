import Comment from '../components/comments/comment';
import CommentsList from '../components/comments/comments-list';
import {render, emoji, key, Position} from '../utils';
import EmojiList from '../components/comments/emoji-list';
import NewComment from '../components/comments/new-comment';
import AddEmojiLabel from '../components/comments/add-emoji-label';
import FilmCommentInput from '../components/comments/film-comment-input';
import EmojiItem from '../components/comments/emoji-item';
import EmojLabel from '../components/comments/emoji-label';
import FilmDetailsComments from '../components/comments/film-details__comments';
import moment from 'moment'

export default class CommentController {
  constructor(container, comments, onEscKeyDown, onDataChange) {
    this._container = container;
    this._comments = comments;
    this._onEscKeyDown = onEscKeyDown;
    this._count = this._comments.length;
    this._onDataChange = onDataChange;
    this._filmDetailsComments = new FilmDetailsComments(this._count);
    this._commentsList = new CommentsList();
    this._newComment = new NewComment();
    this._emojiList = new EmojiList();
    this._filmCommentInput = new FilmCommentInput(this._onSendMsg.bind(this));
    this._addEmojiLabel = new AddEmojiLabel();

  }
  
  init() {
    render(this._container, this._filmDetailsComments.getElement());

    //если есть комментарии отрендерели список
    if(this._comments.length >= 1) {
      render(this._filmDetailsComments.getElement(), this._commentsList.getElement());

      this._comments.forEach((i) => {
        let comment = new Comment(i.emojis, i.text, i.author, i.date, this._onDataChange, this._comments.indexOf(i));
        render(this._commentsList.getElement(), comment.getElement())
      });
    }

    //враппер нового комментария и 
    render(this._filmDetailsComments.getElement(), this._newComment.getElement());
    render(this._newComment.getElement(), this._addEmojiLabel.getElement(), Position.AFTERBEGIN);
    render(this._newComment.getElement(), this._emojiList.getElement());
    render(this._newComment.getElement(), this._filmCommentInput.getElement())

    Object.keys(emoji).forEach((i) => {
      let input  = new EmojiItem(i);
      let label  = new EmojLabel(i, emoji[i], this._onEmojiClick.bind(this));

      render(this._emojiList.getElement(), input.getElement())
      render(this._emojiList.getElement(), label.getElement())
    })    
  }
  
  _onEmojiClick(name) {
    this._addEmojiLabel.getElement().innerHTML = `<img src="${name}" width="55" height="55" alt="emoji">`;
  }

  _onSendMsg(evt) {
      if(evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
        
        evt.preventDefault();
        const text = this._filmCommentInput.getElement().querySelector(`.film-details__comment-input`).value;
        const emojis = this._addEmojiLabel.getElement().querySelector(`img`)
          ? this._addEmojiLabel.getElement().querySelector(`img`).getAttribute(`src`) 
          : `./images/emoji/smile.png`;
        const newComment = this._createNewMsg(emojis, text)
        this._onDataChange(newComment);
        document.removeEventListener(`keydown`, this._onSendMsg)
      }
    }

  _createNewMsg(emojis, text) {
    const newMsg = {
      emojis: emojis,
      text: text,
      author: `secret`,
      date: new Date (),
    }
    return newMsg;
  }
}