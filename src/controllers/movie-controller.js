import {render, unrender, Position} from "../utils";
import {Film} from "../components/film";
import {Popup} from "../components/popup";
import {FilmDetails} from "../components/film-details";
import {cloneDeep} from 'lodash';
import FormDetailsMiddle from '../components/form-details-middle';
import FilmDetailsControls from '../components/film-details-controls';

export default class MovieController {
  constructor(container, data, onDataChange, onChangeView, place) {
    this._container = container;
    this._place = place;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._formDetailsMiddle = new FormDetailsMiddle();
    this._filmComponent = new Film(this._data, this._onEscKeyDown.bind(this), this._renderFilmDetails.bind(this), this.onDataChangefilmComponent.bind(this));
    this._popup = new Popup;
    this._filmDetails = null;
    
    this._tmpData = null;
    this._formDetailsRating = null;
    
  }

  _renderFormDetailsRating(poster, name, ownrating) {
    // const formDetailsRating = FormDetailsRating(this._poster, this._name, this._ownrating)
    this._formDetailsRating = new FormDetailsRating(poster, name, ownrating);
    this._filmDetails.getElement().querySelector(`.form-details__bottom-container`).before(this._formDetailsMiddle.getElement());
    render(this._formDetailsMiddle.getElement(), this._formDetailsRating.getElement(), Position.AFTERBEGIN);
}

  _initTmpData() {
    this._tmpData = cloneDeep(this._data);
  }

  _resetTmpData() {
    this._tmpData = null;
  }

  init() {
    render(this._container, this._filmComponent.getElement(), this._place);
  }

  _renderFilmDetails() {
    render(document.body, this._popup.getElement(), Position.BEFOREEND);
    this._filmDetails = new FilmDetails(this._data, this._onEscKeyDown.bind(this), this.onDataChangePopup.bind(this));
    render(this._popup.getElement(), this._filmDetails.getElement(), Position.BEFOREEND);
    this._onChangeView();
  };

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this.onDataChangePopup;
      unrender(this._filmDetails.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  };

  onDataChangefilmComponent() {
    this._initTmpData();
    const form = this._filmComponent.getElement();
    this._tmpData.watchlist = form.querySelector(`.film-card__controls-item--add-to-watchlist`).classList.contains(`film-card__controls-item--active`),
    this._tmpData.watched = form.querySelector(`.film-card__controls-item--mark-as-watched`).classList.contains(`film-card__controls-item--active`),
    this._tmpData.favorite = form.querySelector(`.film-card__controls-item--favorite`).classList.contains(`film-card__controls-item--active`),

    this._onDataChange(this._tmpData, this._data);
    this._resetTmpData();
  }

  onDataChangePopup(data) {
    this._initTmpData();
    this._tmpData.watchlist = this._filmDetails.getElement().querySelector(`#watchlist`).hasAttribute(`checked`);
    this._tmpData.watched = this._filmDetails.getElement().querySelector(`#watched`).hasAttribute(`checked`)
    this._tmpData.favorite = this._filmDetails.getElement().querySelector(`#favorite`).hasAttribute(`checked`)
    switch (data) {
      case `watchlist`:
        this._tmpData.watchlist = !this._filmDetails.getElement().querySelector(`#watchlist`).hasAttribute(`checked`);
        break
      case `watched`:
        this._tmpData.watched = !this._filmDetails.getElement().querySelector(`#watched`).hasAttribute(`checked`);
        this._data.ownrating = null;
        break
      case `favorite`:
        this._tmpData.favorite = !this._filmDetails.getElement().querySelector(`#favorite`).hasAttribute(`checked`)
        break
    }
    
    this._onDataChange(this._tmpData, this._data);
    this._filmDetails = new FilmDetails(this._tmpData, this._onEscKeyDown.bind(this), this.onDataChangePopup.bind(this));
    this._popup.getElement().replaceChild(this._filmDetails.getElement(), this._popup.getElement().lastChild);

    this._resetTmpData();

  }

  setDefaultView() {
    if (document.body.contains(this._filmDetails.getElement())) {
      unrender(this._filmDetails.getElement());
      // this._filmDetails.removeElement()
    }
  }
}
