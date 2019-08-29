import {AbstractComponent} from './abstract-component.js';

export class NoResult extends AbstractComponent {
  getTemplate() {
    return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    
      <div class="no-result">
      No movies :(
      </div>
    </section>`;
  }
}
