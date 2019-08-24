import {FilmDetails} from './components/film-details';
import {Film} from './components/film';
import {searchTemplate} from './components/search';
import {noResult} from './components/no-result';
import {profileTemplate} from './components/profile';
import {filtersTemplate} from './components/filters';
import {statsTemplate} from './components/stats';
import {sortTemplate} from './components/sort';
import {btnShowMoreTemplate} from './components/btn-show-more';
import {films, filters, titles, countWatched} from './data';
import {render, Position, unrender} from './utils';

const CARDS_LENGTH_EXTRA = 2;
const MAX_TASKS_TO_RENDER = 5;
const headerContainer = document.body.querySelector(`.header`);
const mainContainer = document.body.querySelector(`.main`);

const renderFilm = (filmMock, container) => {
  const film = new Film(filmMock);
  const filmDetails = new FilmDetails(filmMock);

  const renderFilmDetails = () => {
    render(mainContainer, filmDetails.getElement(), Position.BEFOREEND);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      unrender(filmDetails.getElement());
      filmDetails.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmDetailsActive = (test) => {
    film.getElement()
    .querySelector(test)
    .addEventListener(`click`, () => {
      renderFilmDetails();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  };

  filmDetailsActive(`.film-card__poster`);
  filmDetailsActive(`.film-card__title`);
  filmDetailsActive(`.film-card__comments`);

  filmDetails.getElement()
    .querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, () => {
      unrender(filmDetails.getElement());
      filmDetails.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  filmDetails.getElement()
    .querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  filmDetails.getElement()
    .querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  render(container, film.getElement(), Position.BEFOREEND);
};

const renderComponent = (container, template, type = `beforeend`) => {
  container.insertAdjacentHTML(type, template);
};

const renderFilters = () => mainContainer.querySelector(`.main-navigation`)
  .insertAdjacentHTML(`afterBegin`, filters.map(filtersTemplate).join(``));

const profileContainer = document.createElement(`section`);
profileContainer.classList.add(`header__profile`, `profile`);
// nav
const navContainer = document.createElement(`nav`);
navContainer.classList.add(`main-navigation`);
// filmsContainer
const filmsContainer = document.createElement(`section`);
filmsContainer.classList.add(`films`);
// filmsList
const filmsList = document.createElement(`section`);
filmsList.classList.add(`films-list`);
// filmsListContainer
const filmsListContainer = document.createElement(`div`);
filmsListContainer.classList.add(`films-list__container`);
// filmsListExtra
const filmsListExtra = document.createElement(`section`);
filmsListExtra.classList.add(`films-list--extra`);
// title
const filmsListTitle = document.createElement(`h2`);
filmsListTitle.classList.add(`films-list__title`);


renderComponent(headerContainer, searchTemplate());
renderComponent(headerContainer, profileContainer.outerHTML);
renderComponent(headerContainer.querySelector(`.header__profile.profile`), profileTemplate(countWatched));
renderComponent(mainContainer, navContainer.outerHTML);
renderComponent(mainContainer, filmsContainer.outerHTML);
renderComponent(mainContainer.querySelector(`.main-navigation`), statsTemplate());
renderComponent(mainContainer.querySelector(`.films`), filmsList.outerHTML);
renderFilters();

if (films.length === 0) {
  renderComponent(mainContainer.querySelector(`.films-list`), noResult());
} else {
  renderComponent(mainContainer.querySelector(`.films-list`), filmsListContainer.outerHTML);
  renderComponent(mainContainer, sortTemplate());
  renderComponent(mainContainer.querySelector(`.films`), filmsList.outerHTML);
  renderComponent(mainContainer.querySelector(`.films-list`), filmsListContainer.outerHTML);
  renderComponent(mainContainer.querySelector(`.films-list`), btnShowMoreTemplate());

  for (let i = 0; i < CARDS_LENGTH_EXTRA; i++) {
    renderComponent(mainContainer.querySelector(`.films`), filmsListExtra.outerHTML);
  }

  let filmsListExtraContainer = mainContainer.querySelectorAll(`.films-list--extra`);

  filmsListExtraContainer.forEach((item, i) => {
    renderComponent(item, filmsListTitle.outerHTML);
    item.querySelector(`.films-list__title`).innerHTML = titles[i];

    renderComponent(item, filmsListContainer.outerHTML);
    films.slice(0, CARDS_LENGTH_EXTRA).forEach((film) => renderFilm(film, item.querySelector(`.films-list__container`)));
  });

  // renderFilms
  const filmsRenderContainer = mainContainer.querySelector(`.films-list__container`);
  films.slice(0, MAX_TASKS_TO_RENDER).forEach((film) => renderFilm(film, filmsRenderContainer));

  // btn
  const btnShowMore = mainContainer.querySelector(`.films-list__show-more`);

  let filmsRenderedCount = films.length < MAX_TASKS_TO_RENDER ? films.length : MAX_TASKS_TO_RENDER;
  let filmsToRenderCount = films.length - filmsRenderedCount;

  const onLoadMoreButtonClick = () => {
    const filmsToRender = films.slice(filmsRenderedCount, filmsRenderedCount + MAX_TASKS_TO_RENDER);
    filmsToRender.forEach((film) => renderFilm(film, filmsRenderContainer));

    filmsRenderedCount += MAX_TASKS_TO_RENDER;
    filmsToRenderCount = films.length - filmsRenderedCount;

    if (filmsToRenderCount <= 0) {
      btnShowMore.classList.add(`visually-hidden`);
      btnShowMore.removeEventListener(`click`, onLoadMoreButtonClick);
    }
  };

  btnShowMore.addEventListener(`click`, onLoadMoreButtonClick);
}
