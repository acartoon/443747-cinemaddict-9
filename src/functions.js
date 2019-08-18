export const getrandomInteger = (max, min = 1) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export const getRandomElements = (arr, num) => arr.sort(() => 0.5 - Math.random()).slice(0, num);

export const getRandomRating = () => Math.round(0 - 0.5 + Math.random() * (10 - 0 + 1) * 10) / 10;

export const getRandomTime = () => {
  let munute = getrandomInteger(180, 65);
  return `${Math.floor(munute / 60)} h ${Math.floor(munute % 60)} m`;
};

export const descriptionFilm = (description) => {
  let descr = getRandomElements(description.split(`. `), getrandomInteger(3, 1)).join(`. `);
  return descr.length < 140 ? descr : `${description.slice(0, 139).trim()}…`;
};

export function getRandomDate() {
  let randomYear = getrandomInteger(1930, 1990);
  let randomMonth = getrandomInteger(1, 12);
  let randomDate = getrandomInteger(1, 30);
  let date = new Date(randomYear, randomMonth, randomDate);
  return date;
}

export const getCountWatchlist = (item) =>item.watchlist ? true : false;
export const getCountFavorite = (item) => item.favorite ? true : false;
export const getCountwatched = (item) => item.watched ? true : false;

export const counterFilters = (array, func) => {
  return array.reduce((total, x) => (func(x) ? total + 1 : total), 0);
};
