import {AbstractComponent} from './abstract-component.js';

export class FilmBaseComponent extends AbstractComponent {
  constructor({name, genres, rating, runtime, description, watchlist, watched, favorite, releaseDate, poster, comments, originalName, director, writers, actors, country, age}) {
    super();
    this._name = name;
    this._genres = genres;
    this._rating = rating;
    this._runtime = runtime;
    this._description = description;
    this._watchlist = watchlist;
    this._watched = watched;
    this._favorite = favorite;
    this._releaseDate = releaseDate;
    this._poster = poster;
    this._comments = comments;
    this._originalName = originalName;
    this._director = director;
    this._writers = writers;;
    this._actors = actors
    this._country = country;
    this._age = age;
  }
}
