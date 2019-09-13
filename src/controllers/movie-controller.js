import {render, unrender, Position} from "../utils";
import {Film} from "../components/film";
import {Popup} from "../components/popup";
import {cloneDeep} from 'lodash';
import FormDetailsMiddle from '../components/form-details-middle';
import FormDetailsRating from '../components/form-details-rating';

export default class MovieController {
  constructor(container, data, onDataChange, onChangeView, place) {
    this._container = container;
    this._place = place;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._formDetailsMiddle = new FormDetailsMiddle();
    this._filmComponent = new Film(this._data, this._onEscKeyDown.bind(this), this._renderFilmDetails.bind(this), this.onDataChangefilmComponent.bind(this));
    this._popup = new Popup(this._data, this._onEscKeyDown.bind(this), this.onDataChangePopup.bind(this));
    this._tmpData = null;
    this._formDetailsRating = null;
  }

  _renderFormDetailsRating(poster, name, ownrating) {
    // const formDetailsRating = FormDetailsRating(this._poster, this._name, this._ownrating)
    this._formDetailsRating = new FormDetailsRating(poster, name, ownrating);
    this._popup.getElement().querySelector(`.form-details__bottom-container`).before(this._formDetailsMiddle.getElement());
    render(this._formDetailsMiddle.getElement(), this._formDetailsRating.getElement(), Position.AFTERBEGIN);
    console.log(ownrating);
}

  _initTmpData() {
    this._tmpData = cloneDeep(this._data);
  }

  _resetTmpData() {
    this._tmpData = null;
  }

  init() {
    render(this._container, this._filmComponent.getElement(), this._place);

    // if (document.body.contains(`.film-details`)) {
    //   // unrender(this._popup.getElement());
    //   console.log(`test`)
    // }

    if(this._data.watched) {
      this._renderFormDetailsRating(this._data.poster, this._data.name, this._data.ownrating)
    }

    this._popup.getElement()
    .querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, () => {
      this._initTmpData();
      this._tmpData.watched = !this._tmpData.watched;
      if(!this._tmpData.watched) {
        console.log(this._tmpData.watched);
        this._tmpData.ownrating = null;
        unrender(this._formDetailsRating.getElement())
        this._formDetailsRating.removeElement();
      } else {
        // this._formDetailsRating = new FormDetailsRating(this._poster, this._name, this._ownrating);
        // this._renderFormDetailsRating();
       this._renderFormDetailsRating(this._tmpData.poster, this._tmpData.name, this._tmpData.ownrating)
      }
    })
  }

  _renderFilmDetails() {
    render(this._container, this._popup.getElement(), Position.BEFOREEND);
    this._onChangeView();
  };

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this.onDataChangePopup;
      unrender(this._popup.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  };

  // _onClick(selector) {
  //   this._popup.getElement()
  //     .querySelector(selector)
  //       .addEventListener(`click`, (evt) => {
  //         const test = evt.target.getAttribute(`for`);
  //         console.log(test)
  //         this.onDataChangePopup(test);
  //       });
  // }


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
    switch (data) {
      case `watchlist`:
        this._tmpData.watchlist = !this._tmpData.watchlist;
        break
      case `watched`:
        this._tmpData.watched = !this._tmpData.watched;
        break
      case `favorite`:
        this._tmpData.favorite = !this._tmpData.favorite;
        break
    }
    this._onDataChange(this._tmpData, this._data);
    this._resetTmpData();
  }

  setDefaultView() {
    if (document.body.contains(this._popup.getElement())) {
      unrender(this._popup.getElement());
      // this._popup.removeElement()
    }
  }
}
