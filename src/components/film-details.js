import {FilmBaseComponent} from './film-base-component.js';
import FormDetailsMiddle from './form-details-middle';
import FormDetailsBottom from './form-details-bottom';
import FormDetailsRating from './form-details-rating';
import FilmDetailsControls from './film-details-controls';
import {render, Position} from "../utils";
import FormDetailsComments from './film-details__comments.js';
import moment from 'moment'

export class FilmDetails extends FilmBaseComponent {
  constructor(params, onEscKeyDown, onDataChange, onClosePopup, onSendMsg) {
    super(params);
    this._onEscKeyDown = onEscKeyDown;
    this._onDataChange = onDataChange;
    this._onClosePopup = onClosePopup;
    this._onSendMsg = onSendMsg;
    this._formDetailsMiddle = new FormDetailsMiddle();
    this._formDetailsBottom = new FormDetailsBottom();
    this._formDetailsComments = new FormDetailsComments(this._comments, this._onSendMsg, this._onEscKeyDown);
    this._formDetailsRating = new FormDetailsRating(this._poster, this._name, this._ownrating, this._onDataChange);
    this._filmDetailsControls = new FilmDetailsControls(this._watched, this._watchlist, this._favorite, this._onDataChange);

    this._init();
  }

  _init() {
    this._renderControls();
    render(this.getElement(), this._formDetailsBottom.getElement());
    render(this._formDetailsBottom.getElement(), this._formDetailsComments.getElement());

    if(this.watched) {
      this._renderFormDetailsRating();
    }

    this.getElement()
    .querySelector(`.film-details__close`)
      .addEventListener(`click`, () => {
        this._onClosePopup();
        document.removeEventListener(`keydown`, this._onEscKeyDown);
      });

    if(this._watched) {
      this._renderFormDetailsRating();
    }
  }

  _renderControls() {
    render(this.getElement().querySelector(`.form-details__top-container`), this._filmDetailsControls.getElement(), Position.BEFOREEND)
  }

  _renderFormDetailsRating() {
      this._element.querySelector(`.form-details__top-container`).after(this._formDetailsMiddle.getElement());
      render(this._formDetailsMiddle.getElement(), this._formDetailsRating.getElement(), Position.AFTERBEGIN);
  }

  getTemplate() {
    return `<form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${this._poster}" alt="${this._poster}">
    
              <p class="film-details__age">${this._age}</p>
            </div>
    
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${this._name}</h3>
                  <p class="film-details__title-original">Original: ${this._originalName}</p>
                </div>
    
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${this._rating}</p>
                </div>
              </div>
    
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${this._director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${this._writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${this._actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${moment(this._releaseDate).format(`DD MMM YYYY`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${this._runtime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${this._genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                  ${this._genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
                </tr>
              </table>
    
              <p class="film-details__film-description">
                ${this._description}
              </p>
            </div>
          </div>
        </div>
      </form>`;
  }
}
