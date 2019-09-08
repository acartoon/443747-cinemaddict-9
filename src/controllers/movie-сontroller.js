import {render, unrender, Position} from "../utils";
import {Film} from "../components/film";
import {FilmDetails} from "../components/film-details";

export default class MovieController {
  constructor(container, data, onDataChange) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._filmComponent = new Film(this._data, this._onEscKeyDown.bind(this), this._renderFilmDetails.bind(this), this.onDataChangefilmComponent.bind(this));
    this._filmDetailsComponent = new FilmDetails(this._data, this._onEscKeyDown.bind(this));
  }
  
  _renderFilmDetails() {
    render(this._container, this._filmDetailsComponent.getElement(), Position.BEFOREEND);
  };
    
  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      unrender(this._filmDetailsComponent.getElement());
      this._filmDetailsComponent.removeElement();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  };
  
  init() {
    render(this._container, this._filmComponent.getElement(), Position.BEFOREEND);
    // this._filmDetailsComponent.getElement()
    //   .querySelector(`textarea`)
    //   .addEventListener(`focus`, () => {
    //     document.removeEventListener(`keydown`, onEscKeyDown);
    //   });

    // this._filmDetailsComponent.getElement()
    //   .querySelector(`textarea`)
    //   .addEventListener(`blur`, () => {
    //     document.addEventListener(`keydown`, onEscKeyDown);
    //   });

  }

  onDataChangefilmComponent() {
    const form = this._filmComponent.getElement();
    const entry = {
      name: form.querySelector(`.film-card__title`).innerHTML,
      genres: [],
      rating: form.querySelector(`.film-card__rating`).innerHTML,
      runtime: form.querySelector(`.film-card__duration`).innerHTML,
      description: form.querySelector(`.film-card__description`).innerHTML,
      releaseDate: form.querySelector(`.film-card__year`).innerHTML,
      poster: form.querySelector(`.film-card__poster`).getAttribute('src'),
      comments: form.querySelector(`.film-card__title`).innerHTML,
      watchlist: form.querySelector(`.film-card__controls-item--add-to-watchlist`).classList.contains(`film-card__controls-item--active`),
      watched: form.querySelector(`.film-card__controls-item--mark-as-watched`).classList.contains(`film-card__controls-item--active`),
      favorite: form.querySelector(`.film-card__controls-item--favorite`).classList.contains(`film-card__controls-item--active`),
      originalName: this._data.originalName,
      director: this._data.director,
      writers: this._data.writers,
      actors: this._data.actors,
      age: this._data.age,
      country: this._data.country,
      comments: {
        amount: this._data.comments.amount,
        comment: {
          text: this._data.comments.comment.text,
          author: this._data.comments.comment.author,
          date: this._data.comments.comment.date,
          emojis: this._data.comments.comment.emojis,
        }
      }
    };
    this._onDataChange(entry, this._data);
  }

  onChangeView() {

  }
}