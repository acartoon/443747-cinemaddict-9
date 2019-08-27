import {Film} from "./film";
import {FilmDetails} from "./film-details";
import {Films} from "./films";
import {FilmsList} from "./films-list";
import {render, unrender, Position} from "../utils";
import {BtnShowMore} from "./btn-show-more";
import {NoResult} from './no-result';

export class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._noResult = new NoResult();
    this._btn = new BtnShowMore();
    this._filmsContainer = new Films();
    this._allFilmsList = new FilmsList(false, `All movies. Upcoming`);
    this._topRatedFilmsList = new FilmsList(true, `Top rated`);
    this._mostCommentedFilmsList = new FilmsList(true, `Most commented`);
    this._MAX_FILMS_TO_RENDER = 5;
    this._filmsRenderedCount = ``;
    this._filmsToRenderedCount = ``;
    this._filmsToRender = [];
  }

  _countToRender() {
    this._filmsRenderedCount = this._films.length < this._MAX_FILMS_TO_RENDER ? this._films.length : this._MAX_FILMS_TO_RENDER;
    this._filmsToRender = this._films.slice(0, this._filmsRenderedCount);
    this._filmsToRenderedCount = this._films.length - this._filmsRenderedCount;
  }

  init() {

    if(this._films.length === 0) {
      render(this._container, this._noResult.getTemplate(), Position.BEFOREEND);
    } else {
      this._countToRender();
      render(this._container, this._filmsContainer.getElement(), Position.BEFOREEND);
      render(this._filmsContainer.getElement(), this._allFilmsList.getElement(), Position.BEFOREEND);
      this._filmsToRender.forEach((item) => this._renderFilm(this._filmsContainer, item));
  
      if (this._films.some((film) => film.rating)) {
        render(this._filmsContainer.getElement(), this._topRatedFilmsList.getElement(), Position.BEFOREEND);
        let filmsRender = this._films.slice().sort((a, b) => b.rating - a.rating);
        filmsRender.slice(0, 2).forEach((film) => this._renderFilm(this._topRatedFilmsList, film));
      }
  
      if (this._films.some((film) => film.comments.amount)) {
        render(this._filmsContainer.getElement(), this._mostCommentedFilmsList.getElement(), Position.BEFOREEND);
        let filmsRender = this._films.slice().sort((a, b) => b.comments.amount - a.comments.amount);
        filmsRender.slice(0, 2).forEach((film) => this._renderFilm(this._mostCommentedFilmsList, film));
      }
  
      if (this._filmsToRenderedCount > 0) {
        render(this._allFilmsList.getElement(), this._btn.getElement(), Position.BEFOREEND);
      }
  
      this._btn.getElement().addEventListener(`click`, (evt) => this._onBtnClick(evt));
    }
  }

  _renderFilm(container, filmMock) {
    const filmComponent = new Film(filmMock);
    const filmDetailsComponent = new FilmDetails(filmMock);

    const renderFilmDetails = () => {
      render(this._container, filmDetailsComponent.getElement(), Position.BEFOREEND);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(filmDetailsComponent.getElement());
        filmDetailsComponent.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const filmDetailsActive = (selector) => {
      filmComponent.getElement()
        .querySelector(selector)
        .addEventListener(`click`, () => {
          renderFilmDetails();
          document.addEventListener(`keydown`, onEscKeyDown);
        });
    };

    filmDetailsActive(`.film-card__poster`);
    filmDetailsActive(`.film-card__title`);
    filmDetailsActive(`.film-card__comments`);

    filmDetailsComponent.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        console.log(`test`);
        unrender(filmDetailsComponent.getElement());
        filmDetailsComponent.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    filmDetailsComponent.getElement()
      .querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    filmDetailsComponent.getElement()
      .querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    render(container.getElement().querySelector(`.films-list__container`), filmComponent.getElement(), Position.BEFOREEND);
  };

  _onBtnClick(evt) {
    this._filmsRenderedCount += this._MAX_FILMS_TO_RENDER;
    this._filmsToRender = this._films.slice(0, this._filmsRenderedCount);
    this._filmsContainer.getElement().querySelector(`.films-list__container`).innerHTML = ``;
    this._filmsToRender.forEach((item) => this._renderFilm(this._filmsContainer, item));
    this._filmsToRenderedCount = this._films.length - this._filmsRenderedCount;

    if (this._filmsToRenderedCount <= 0) {
      document.querySelector(`.films-list__show-more`).classList.add(`visually-hidden`);
    }
  }
}
