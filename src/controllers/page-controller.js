import MovieController from "./movie-controller";
import {Films} from "../components/films";
import {FilmsList} from "../components/films-list";
import {render, unrender, Position} from "../utils";
import {BtnShowMore} from "../components/btn-show-more";
import {NoResult} from '../components/no-result';
import {Sort} from "../components/sort";

export class PageController {
  constructor(container, films) {
    this._sort = new Sort();
    this._noResult = new NoResult();
    this._btn = new BtnShowMore();
    this._filmsContainer = new Films();
    this._allFilmsList = new FilmsList(false, `All movies. Upcoming`);
    this._topRatedFilmsList = new FilmsList(true, `Top rated`);
    this._mostCommentedFilmsList = new FilmsList(true, `Most commented`);
    this._container = container;
    this._films = films;
    this._STEP_TO_RENDER = 5;
    this._filmsToRender = '';
    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
  }

  _onMovieController(container, data) {
    return new MovieController(container, data, this._onDataChange, this._onChangeView.bind(this), Position.BEFOREEND).init();
  }

  _renderTopRatedFilms() {
    if (this._films.some((film) => film.rating)) {
      render(this._filmsContainer.getElement(), this._topRatedFilmsList.getElement(), Position.BEFOREEND);
      let filmsRender = this._films.slice().sort((a, b) => b.rating - a.rating);
      let container = this._topRatedFilmsList.getElement().querySelector(`.films-list__container`);
      filmsRender.slice(0, 2).forEach((item) => this._onMovieController(container, item));
      this._subscriptions.forEach((subscription) => subscription());
    }
  }

  _renderMostCommentedFilms() {
    if (this._films.some((film) => film.comments.length)) {
      render(this._filmsContainer.getElement(), this._mostCommentedFilmsList.getElement(), Position.BEFOREEND);
      let filmsRender = this._films.slice().sort((a, b) => b.comments.amount - a.comments.amount);
      let container = this._mostCommentedFilmsList.getElement().querySelector(`.films-list__container`);
      filmsRender.slice(0, 2).forEach((item) => this._onMovieController(container, item));
      this._subscriptions.forEach((subscription) => subscription());
    }
  }

  init() {
    this._filmsToRender = this._STEP_TO_RENDER;
    render(this._container, this._sort.getElement(), Position.BEFOREEND);

    if (this._films.length === 0) {
      render(this._container, this._noResult.getTemplate(), Position.BEFOREEND);
    } else {
      //все фильмы
      render(this._container, this._filmsContainer.getElement(), Position.BEFOREEND);
      render(this._filmsContainer.getElement(), this._allFilmsList.getElement(), Position.BEFOREEND);
      let container = this._filmsContainer.getElement().querySelector(`.films-list__container`);
      this._films.slice(0, this._filmsToRender).forEach((item) => this._onMovieController(container, item));
      this._subscriptions.forEach((subscription) => subscription());

      // высокие рейтинги
     this._renderTopRatedFilms();

      //наиболее комментируемые
      this._renderMostCommentedFilms();

      //рендер кнопки
      if (this._STEP_TO_RENDER < this._films.length) {
        render(this._allFilmsList.getElement(), this._btn.getElement(), Position.BEFOREEND);
      }

      this._btn.getElement().addEventListener(`click`, (evt) => this._onBtnClick(evt));
      this._sort.getElement().addEventListener(`click`, (evt) => this._onSort(evt));
    }
  }

  _onBtnClick(evt) {
    evt.preventDefault();
    this._filmsToRender += this._STEP_TO_RENDER;
    let container = this._allFilmsList.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;
    this._films.slice(0, this._filmsToRender).forEach((item) => this._onMovieController(container, item));

    if (this._filmsToRender >= this._films.length) {
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
        const sortedByDateFilms = this._films.slice(0, this._filmsToRender).sort((a, b) => a.releaseDate - b.releaseDate);
        sortedByDateFilms.forEach((item) => this._onMovieController(container, item));
        break;
      case `rating`:
        const sortedByRatingFilms = this._films.slice(0, this._filmsToRender).sort((a, b) => b.rating - a.rating);
        sortedByRatingFilms.forEach((item) => this._onMovieController(container, item));
        break;
      case `default`:
        this._films.slice(0, this._filmsToRender).forEach((item) => this._onMovieController(container, item));
        break;
    }
  }

  _onDataChange(newData, oldData) {
    const index = this._films.findIndex((it) => it.id === oldData.id);
    this._films[index] = newData;
    this._renderBoard_(index);
  }

  _renderBoard_(index) {
    let container = this._filmsContainer.getElement().querySelector(`.films-list__container`);
    const movie = new MovieController(container, this._films[index], this._onDataChange, this._onChangeView.bind(this), index);
    movie.init()
    this._subscriptions.forEach((subscription) => subscription());
  }

  _renderBoard(data) {

    //перерендерить карточку конкретного фильма
    //если открыт попап, то перерендерить и его
    //перерендерить фильмы по фильтрам

    let container = this._filmsContainer.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;
    data.slice(0, this._filmsToRender).forEach((item) => new MovieController(container, item, this._onDataChange).init());

    unrender(this._mostCommentedFilmsList.getElement());
    unrender(this._topRatedFilmsList.getElement());

    this._topRatedFilmsList.removeElement();
    this._mostCommentedFilmsList.removeElement()

    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }
  
    _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}
