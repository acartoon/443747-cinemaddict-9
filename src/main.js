import {searchTemplate} from './components/search.js';
import {profileTemplate} from './components/profile.js';
import {filtersTemplate} from './components/filters.js';
import {statsTemplate} from './components/stats.js';
import {sortTemplate} from './components/sort.js';
import {filmCardTemplate} from './components/film-card.js';
import {btnShowMoreTemplate} from './components/btn-show-more.js';
import {filmDtailsTemplate} from './components/film-details.js';

const CARDS_LENGTH = 5;
const CARDS_LENGTH_EXTRA = 2;
const titlesArr = [`Top rated`, `Most commented`];

function render(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}

const headerContainer = document.body.querySelector(`.header`);

// search
render(headerContainer, searchTemplate());

// profile
const profileContainer = document.createElement(`section`);
profileContainer.classList.add(`header__profile`, `profile`);

render(headerContainer, profileContainer.outerHTML);
render(headerContainer.querySelector(`.header__profile.profile`), profileTemplate());

// nav
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

// btn
render(mainContainer.querySelector(`.films-list`), btnShowMoreTemplate());

// filmsListExtra
const filmsListExtra = document.createElement(`section`);
filmsListExtra.classList.add(`films-list--extra`);

for (let i = 0; i < CARDS_LENGTH_EXTRA; i++) {
  render(mainContainer.querySelector(`.films`), filmsListExtra.outerHTML);
}

const filmsListTitle = document.createElement(`h2`);
filmsListTitle.classList.add(`films-list__title`);

let filmsListExtraContainer = mainContainer.querySelectorAll(`.films-list--extra`);

filmsListExtraContainer.forEach((item, i) => {
  render(item, filmsListTitle.outerHTML);
  item.querySelector(`.films-list__title`).innerHTML = titlesArr[i];

  render(item, filmsListContainer.outerHTML);

  for (let a = 0; a < CARDS_LENGTH_EXTRA; a++) {
    render(item.querySelector(`.films-list__container`), filmCardTemplate());
  }
});

// popap
const bodyContainer = document.body;

render(bodyContainer, filmDtailsTemplate());
