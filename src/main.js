import {searchTemplate} from './components/search.js';
import {profileTemplate} from './components/profile.js';
import {filtersTemplate} from './components/filters.js';
import {statsTemplate} from './components/stats.js';
import {sortTemplate} from './components/sort.js';
import {filmCardTemplate} from './components/film-card.js';
import {btnShowMoreTemplate} from './components/btn-show-more.js';

const CARDS_LENGTH = 5;

function render(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}

const headerContainer = document.body.querySelector(`.header`);

render(headerContainer, searchTemplate());

const profileContainer = document.createElement(`section`);
profileContainer.classList.add(`header__profile`, `profile`);

render(headerContainer, profileContainer.outerHTML);
render(headerContainer.querySelector(`.header__profile.profile`), profileTemplate());


const mainContainer = document.body.querySelector(`.main`);

const navContainer = document.createElement(`nav`);
navContainer.classList.add(`main-navigation`);

render(mainContainer, navContainer.outerHTML);
render(mainContainer.querySelector(`.main-navigation`), filtersTemplate());
render(mainContainer.querySelector(`.main-navigation`), statsTemplate());
render(mainContainer, sortTemplate());


// content
const filmsContainer = document.createElement(`section`);
filmsContainer.classList.add(`films`);

render(mainContainer, filmsContainer.outerHTML);

// filmsList

const filmsList = document.createElement(`section`);
filmsList.classList.add(`films-list`);

render(mainContainer.querySelector(`.films`), filmsList.outerHTML);

const filmsListContainer = document.createElement(`div`);
filmsListContainer.classList.add(`films-list__container`);

render(mainContainer.querySelector(`.films-list`), filmsListContainer.outerHTML);

for (let i = 0; i < CARDS_LENGTH; i++) {
  render(mainContainer.querySelector(`.films-list__container`), filmCardTemplate());
}

render(mainContainer.querySelector(`.films-list`), btnShowMoreTemplate());


const filmsListExtra = document.createElement(`section`);
filmsListExtra.classList.add(`films-list--extra`);

for (let i = 0; i < 2; i++) {
  render(mainContainer.querySelector(`.films`), filmsListExtra.outerHTML)
}

let filmsListExtraContainer = mainContainer.querySelectorAll(`.films-list--extra`);

filmsListExtraContainer.forEach(function(item) {
  render(item, filmsListContainer.outerHTML);

  for (let i = 0; i < 2; i++) {
    render(item.querySelector(`.films-list__container`), filmCardTemplate());
  }
});

//popap
