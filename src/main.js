import {PageController} from './controllers/page-controller';
import {searchTemplate} from './components/search';
import Filters from "./components/filters";
import {render} from "./utils";
import MainNav from "./components/main-nav";
import Stats from "./components/stats";
import {profileTemplate} from './components/profile';
import {films, countWatched, FiltersData} from './data';

const headerContainer = document.body.querySelector(`.header`);
const mainContainer = document.body.querySelector(`.main`);
const pageController = new PageController(mainContainer);
const mainNav = new MainNav;
const stats = new Stats;

const renderComponent = (container, template, type = `beforeend`) => {
  container.insertAdjacentHTML(type, template);
};

const profileContainer = document.createElement(`section`);
profileContainer.classList.add(`header__profile`, `profile`);

renderComponent(headerContainer, searchTemplate());
renderComponent(headerContainer, profileContainer.outerHTML);
renderComponent(headerContainer.querySelector(`.header__profile.profile`), profileTemplate(countWatched));

render(mainContainer, mainNav.getElement());

FiltersData.forEach(i => {
  let filter = new Filters(i.title, i.count, i.link);
  render(mainNav.getElement(), filter.getElement());
});
render(mainNav.getElement(), stats.getElement());

pageController.show(films);