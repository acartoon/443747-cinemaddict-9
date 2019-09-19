import MovieController from "./movie-controller";
import {Films} from "../components/films";
import {FilmsList} from "../components/films-list";
import {render, unrender, Position} from "../utils";
import {BtnShowMore} from "../components/btn-show-more";
import {NoResult} from '../components/no-result';
import {Sort} from "../components/sort";
import { FilmListController } from "./film-list-controller";

export class PageController {
  constructor(container) {
    this._sort = new Sort();
    this._noResult = new NoResult();
    this._btn = new BtnShowMore();
    this._movieContainer = new Films();
    this._allFilmsList = new FilmsList(false, `All movies. Upcoming`);
    this._topRatedFilmsList = new FilmsList(true, `Top rated`);
    this._mostCommentedFilmsList = new FilmsList(true, `Most commented`);
    this._container = container;
    this._movie = [];
    this._STEP_TO_RENDER = 5;
    this._movieToRender = null;
    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    
  }



  _onLoadMoreButtonClick(evt) {
    evt.preventDefault();
    this._movieToRender += this._STEP_TO_RENDER;
    let container = this._allFilmsList.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;
    let filmsToRender = this._movie.slice(0, this._movieToRender);
    let filmList = new FilmListController(container, this._onDataChange.bind(this))
    filmList.setMovie(filmsToRender);

    if (this._movieToRender >= this._movie.length) {
      this._btn.getElement().classList.add(`visually-hidden`);
    }
  }

  _onSort(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }
    const container = this._allFilmsList.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date`:
        const sortedByDateFilms = this._movie.slice(0, this._movieToRender).sort((a, b) => a.releaseDate - b.releaseDate);
        sortedByDateFilms.forEach((item) => this._onMovieController(container, item));
        break;
      case `rating`:
        const sortedByRatingFilms = this._movie.slice(0, this._movieToRender).sort((a, b) => b.rating - a.rating);
        sortedByRatingFilms.forEach((item) => this._onMovieController(container, item));
        break;
      case `default`:
        this._movie.slice(0, this._movieToRender).forEach((item) => this._onMovieController(container, item));
        break;
    }
  }

  _onDataChange(movie) {
    console.log(`_onDataChange`)
    this._movie = movie;

    this._renderBoard();
  }

  show(movie) {
    if (movie !== this._movie) {
      this._setMovie(movie);
    }
    // this._board.getElement().classList.remove(`visually-hidden`);
  }

  _setMovie(movie) {
    this._movie = movie;
    this._movieToRender = this._STEP_TO_RENDER;

    this._renderBoard();
  }

  _init() {
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    this._btn.getElement().addEventListener(`click`, (evt) => this._onLoadMoreButtonClick(evt));
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSort(evt));

  }
  _renderBoard() {
    //сортировка
    console.log(`_renderBoard`)
    if (this._movie.length === 0) {
      render(this._container, this._noResult.getTemplate(), Position.BEFOREEND);
    } else {
      //все фильмы
      render(this._container, this._movieContainer.getElement(), Position.BEFOREEND);
      render(this._movieContainer.getElement(), this._allFilmsList.getElement(), Position.BEFOREEND);

      let filmsToRender = this._movie.slice(0, this._movieToRender);
      let container = this._movieContainer.getElement().querySelector(`.films-list__container`);
      let filmList = new FilmListController(container, this._onDataChange.bind(this))
      filmList.setMovie(filmsToRender);

      if (this._movie.some((film) => film.rating)) {
        render(this._movieContainer.getElement(), this._topRatedFilmsList.getElement(), Position.BEFOREEND);
        let filmsToRender = this._movie.slice().sort((a, b) => b.rating - a.rating).slice(0, 2);
        let container = this._topRatedFilmsList.getElement().querySelector(`.films-list__container`);
        let filmList = new FilmListController(container, this._onDataChange.bind(this))
        filmList.setMovie(filmsToRender)
      }
  
      if (this._movie.some((film) => film.comments.length)) {
        render(this._movieContainer.getElement(), this._mostCommentedFilmsList.getElement(), Position.BEFOREEND);
        let filmsToRender = this._movie.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
        let container = this._mostCommentedFilmsList.getElement().querySelector(`.films-list__container`);
        let filmList = new FilmListController(container, this._onDataChange.bind(this))
        filmList.setMovie(filmsToRender)
    }
    

      //рендер кнопки
      if (this._STEP_TO_RENDER < this._movie.length) {
        render(this._allFilmsList.getElement(), this._btn.getElement(), Position.BEFOREEND);
      }

    }
  }
}
