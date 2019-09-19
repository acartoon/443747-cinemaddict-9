import MovieController from "./movie-controller";

import {Position} from "../utils";

export class FilmListController {
  constructor(container, onDataChange) {
    this._container = container;
    this._movie = [];
    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChangeMain = onDataChange;
  }

  show() {
    this._filmsContainer.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._filmsContainer.getElement().classList.add(`visually-hidden`);
  }

  setMovie(movie) {
    console.log(`setMovie`)
    this._movie = movie;
    this._subscriptions = [];
    this._container.innerHTML = ``;
    this._movie.forEach((film) => this._renderMovie(film));
  }

  _renderMovie(film) {
    const movie = new MovieController(this._container, film, this._onDataChange, this._onChangeView, Position.BEFOREEND);
    movie.init();
    this._subscriptions.push(movie.setDefaultView.bind(movie));
  }

  _onDataChange(newData, oldData) {
    console.log(newData.id)
    const index = this._movie.findIndex((it) => it.id === oldData.id);
    this._movie[index] = newData;
    console.log(this._movie[index].id)
    this.setMovie(this._movie);
    this._onDataChangeMain(this._movie);
  }

  _onChangeView() {
    console.log(`_onChangeView`)
    this._subscriptions.forEach((subscription) => subscription());
  }
}
