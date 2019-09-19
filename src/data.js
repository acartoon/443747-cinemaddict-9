import {
  getRandomRating,
  getRandomElements,
  descriptionFilm,
  getRandomDate,
  getrandomInteger,
  getRandomTime,
  counterFilters,
  getCountWatchlist,
  getCountFavorite,
  getCountwatched
} from './utils.js';

const namesFilm = new Set([
  `Здравствуйте, я Ваша тетя`,
  `Собака баскервилей`,
  `Some Like It Hot`,
  `Jurassic Park`,
  `Psycho`,
  `Rear Window`,
  `Dial M for Murder`,
  `The Thing`,
  `Мой ласковый и нежный зверь`,
  `Сталкер`,
  `Солярис`,
  `Alien`,
  `The Silence of the Lambs`,
  `The Shining`,
  `Ghostbusters`,
]);

const namesPiples = new Set([
  `Alfred Hitchcock`,
  `Stanley Kubrick`,
  `Steven Spielberg`,
  `Андрей Тарковский`,
  `Quentin Tarantino`,
  `Sigourney Weaver`,
  `John Hurt`,
  `Ian Holm`,
]);

const countries = new Set([`USA`, `Russia`, `UK`, `New Zealand`]);
const genres = new Set([`Horror`, `Comedy`, `Romance`, `Fantasy`, `Drama`, `Cartoon`]);
const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const posters = [`./images/posters/made-for-each-other.png`, `./images/posters/popeye-meets-sinbad.png`, `./images/posters/sagebrush-trail.jpg`, `./images/posters/santa-claus-conquers-the-martians.jpg`, `./images/posters/the-dance-of-life.jpg`, `./images/posters/the-great-flamarion.jpg`, `./images/posters/the-man-with-the-golden-arm.jpg`];
const film = () => ({
  id: getrandomInteger(1050),
  name: Array.from(namesFilm)[getrandomInteger(4)],
  originalName: Array.from(namesFilm)[getrandomInteger(14)],
  director: Array.from(namesPiples)[getrandomInteger(4)],
  genres: getRandomElements(Array.from(genres), getrandomInteger(4)),
  rating: getRandomRating(),
  ownrating: getrandomInteger(9),
  runtime: getRandomTime(),
  description: descriptionFilm(description),
  watchlist: Boolean(Math.round(Math.random())),
  watched: Boolean(Math.round(Math.random())),
  favorite: Boolean(Math.round(Math.random())),
  writers: getRandomElements(Array.from(namesPiples), 2).join(`, `),
  actors: getRandomElements(Array.from(namesPiples), 3).join(`, `),
  releaseDate: getRandomDate(),
  country: Array.from(countries)[Math.floor(Math.random() * 4)],
  age: `${getrandomInteger(21)}+`,
  poster: posters[getrandomInteger(6)],
  comments: [
    {
      emojis: `./images/emoji/smile.png`,
      text: descriptionFilm(description),
      author: Array.from(namesPiples)[getrandomInteger(4)],
      date: getRandomDate(),
    },
    {
      emojis: `./images/emoji/smile.png`,
      text: descriptionFilm(description),
      author: Array.from(namesPiples)[getrandomInteger(4)],
      date: getRandomDate(),
    }
]
});

const titles = [`Top rated`, `Most commented`];
const films = new Array(Array.from(namesFilm).length).fill(``).map(film);
const filmslength = films.length;
const countWatched = counterFilters(films, getCountwatched);

const FiltersData = [
  {
    title: `All movies`,
    count: filmslength,
    link: `#`,
  },
  {
    title: `Watchlist`,
    count: counterFilters(films, getCountWatchlist),
    link: `Watchlist`,
  },
  {
    title: `History`,
    count: countWatched,
    link: `history`,
  },
  {
    title: `Favorites`,
    count: counterFilters(films, getCountFavorite),
    link: `favorites`,
  },
];

export {titles, films, FiltersData, countWatched};
