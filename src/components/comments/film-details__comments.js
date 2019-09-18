import {AbstractComponent} from '../abstract-component';

export default class FilmDetailsComments extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count
  }

  getTemplate() {
    return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._count}</span></h3>
    
    </section>`;
  }
}
