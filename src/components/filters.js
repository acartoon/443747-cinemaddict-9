export const filtersTemplate = ({title, count, link}) =>
  `<a href="#${link}" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>`.trim();
