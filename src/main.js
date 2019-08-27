import {PageController} from './components/page-controller.js';
import {Film} from './components/film';
import {searchTemplate} from './components/search';
import {noResult} from './components/no-result';
import {profileTemplate} from './components/profile';
import {filtersTemplate} from './components/filters';
import {statsTemplate} from './components/stats';
import {sortTemplate} from './components/sort';
import {btnShowMoreTemplate} from './components/btn-show-more';
import {films, filters, titles, countWatched} from './data';

const CARDS_LENGTH_EXTRA = 2;
const headerContainer = document.body.querySelector(`.header`);
const mainContainer = document.body.querySelector(`.main`);
const pageController = new PageController(mainContainer, films);

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


renderComponent(headerContainer, searchTemplate());
renderComponent(headerContainer, profileContainer.outerHTML);
renderComponent(headerContainer.querySelector(`.header__profile.profile`), profileTemplate(countWatched));
renderComponent(mainContainer, navContainer.outerHTML);
renderComponent(mainContainer.querySelector(`.main-navigation`), statsTemplate());
renderFilters();
pageController.init();

// if (films.length === 0) {
//   renderComponent(mainContainer.querySelector(`.films-list`), noResult());
// } else {
//   for (let i = 0; i < CARDS_LENGTH_EXTRA; i++) {
//     renderComponent(mainContainer.querySelector(`.films`), filmsListExtra.outerHTML);
//   }

  // let filmsListExtraContainer = mainContainer.querySelectorAll(`.films-list--extra`);

  // filmsListExtraContainer.forEach((item, i) => {
  //   renderComponent(item, filmsListTitle.outerHTML);
  //   item.querySelector(`.films-list__title`).innerHTML = titles[i];

  //   renderComponent(item, filmsListContainer.outerHTML);
  //   films.slice(0, CARDS_LENGTH_EXTRA).forEach((film) => renderFilm(film, item.querySelector(`.films-list__container`)));
  // });

  // // renderFilms
  // const filmsRenderContainer = mainContainer.querySelector(`.films-list__container`);
  // films.slice(0, MAX_TASKS_TO_RENDER).forEach((film) => renderFilm(film, filmsRenderContainer));
// }
