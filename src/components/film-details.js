import {FilmBaseComponent} from './film-base-component.js';
import FormDetailsMiddle from './form-details-middle';
import FormDetailsRating from './form-details-rating';
import FilmDetailsContlols from './film-details-controls';
import FilmDetailsControlsContainer from './film-details-controls-container';
import {render, unrender, Position} from "../utils";

export class FilmDetails extends FilmBaseComponent {
  constructor(params, onEscKeyDown, onDataChange) {
    super(params);
    this._onEscKeyDown = onEscKeyDown;
    this._onDataChange = onDataChange;
    this._formDetailsMiddle = new FormDetailsMiddle();
    this._formDetailsRating = new FormDetailsRating(this._poster, this._name, this._ownrating);
    this._filmDetailsControlsContainer = new FilmDetailsControlsContainer();
    this._filmDetailsContlolsWatchlis = new FilmDetailsContlols(`watchlist`, this._watchlist);
    this._filmDetailsContlolsWatched = new FilmDetailsContlols(`watched`, this._watched);
    this._filmDetailsContlolsFavorite = new FilmDetailsContlols(`favorite`, this._favorite);

    this._init();
  }



  _renderControls() {
    const container = this.getElement().querySelector(`.form-details__top-container`);
    render(container, this._filmDetailsControlsContainer.getElement(), Position.BEFOREEND);

    this._filmDetailsContlolsWatchlis.init(this._filmDetailsControlsContainer.getElement());
    this._filmDetailsContlolsWatched.init(this._filmDetailsControlsContainer.getElement());
    this._filmDetailsContlolsFavorite.init(this._filmDetailsControlsContainer.getElement());
  }

  _renderFormDetailsRating() {
      this._element.querySelector(`.form-details__bottom-container`).before(this._formDetailsMiddle.getElement());
      render(this._formDetailsMiddle.getElement(), this._formDetailsRating.getElement(), Position.AFTERBEGIN);
  }


  _init() {
    this._renderControls();
    this._onClick(`.film-details__control-label--watchlist`);
    this._onClick(`.film-details__control-label--watched`);
    this._onClick(`.film-details__control-label--favorite`);

    this.getElement()
    .querySelector(`.film-details__close`)
      .addEventListener(`click`, () => {
        console.log(this.getElement())
        unrender(this.getElement());
        document.removeEventListener(`keydown`, this._onEscKeyDown);
      });

    if(this._watched) {
      this._renderFormDetailsRating();
    }



    // this.getElement()
    //   .querySelector(`.film-details__control-label--watched`)
    //   .addEventListener(`click`, () => {
    //     this._onDataChange();
    //     // this._renderFormDetailsRating();
    //     // if(!this._watched) {
    //     //   unrender(this._formDetailsRating.getElement())
    //     //   this._formDetailsRating.removeElement();
    //     // } else {
    //     //   this._renderFormDetailsRating();
    //     // }
    //   })
    }
    
  _onClick(selector) {
    this.getElement()
      .querySelector(selector)
        .addEventListener(`click`, (evt) => {
          this._watchlist = !this._watchlist;
          const test = evt.target.getAttribute(`for`);
          console.log(test)
          this._onDataChange(test);
        });
  }

  getTemplate() {
    return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
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
                  <td class="film-details__cell">${new Date(this._releaseDate).toDateString()}</td>
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
    
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
    
            <ul class="film-details__comments-list">
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="${this._comments.comment.emojis}" width="55" height="55" alt="emoji">
                </span>
                <div>
                  <p class="film-details__comment-text">${this._comments.comment.text}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${this._comments.comment.author}</span>
                    <span class="film-details__comment-day">${this._comments.comment.date}</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>
            </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
    
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
    
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`;
  }
}
