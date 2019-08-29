import {PageController} from './components/page-controller.js';
import {searchTemplate} from './components/search';

import {profileTemplate} from './components/profile';
import {filtersTemplate} from './components/filters';
import {statsTemplate} from './components/stats';
import {films, filters, countWatched} from './data';

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
