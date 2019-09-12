import FilmDetailsInput from './film-details-input';
import FilmDetailsLabel from './film-details-label';
import {render, Position} from "../utils";
import {AbstractComponent} from './abstract-component.js';

export default class FilmDetailsContlols extends AbstractComponent{
  constructor(name, controls) {
    super();
    this._name = name;
    this._controls = controls;
    this._filmDetailsInput = new FilmDetailsInput(this._name, this._controls);
    this._filmDetailsLabel = new FilmDetailsLabel(this._name);
  }

  
  init(container) {
    // if(this._name == `watchlist`) {
    //   console.log(this._controls);

    // }
    render(container, this._filmDetailsInput.getElement(), Position.BEFOREEND)
    render(container, this._filmDetailsLabel.getElement(), Position.BEFOREEND)
  }
}
