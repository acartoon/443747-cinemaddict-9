import {render, unrender, Position} from "../utils";
import {Film} from "../components/film";
import {FilmDetails} from "../components/film-details";
import {cloneDeep} from 'lodash';


export default class MovieController {
  constructor(container, data, onDataChange, onChangeView, place) {
    this._container = container;
    this._place = place;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._filmComponent = new Film(this._data, this._onEscKeyDown.bind(this), this._renderFilmDetails.bind(this), this.onDataChangefilmComponent.bind(this));
    this._filmDetailsComponent = new FilmDetails(this._data, this._onEscKeyDown.bind(this), this.onDataChangefilmDetailsComponent.bind(this));
  }

  _initTmpData() {
    this._tmpData = cloneDeep(this._data);
  }

    init() {
      render(this._container, this._filmComponent.getElement(), this._place);
      this._initTmpData();
      // console.log(this._data);
      // this._filmDetailsComponent.getElement()
      //   .querySelector(`textarea`)
      //   .addEventListener(`focus`, () => {
      //     document.removeEventListener(`keydown`, onEscKeyDown);
      //   });
  
      // this._filmDetailsComponent.getElement()
      //   .querySelector(`textarea`)
      //   .addEventListener(`blur`, () => {
      //     document.addEventListener(`keydown`, onEscKeyDown);
      //   });
  
    }
  
  _renderFilmDetails() {
    render(this._container, this._filmDetailsComponent.getElement(), Position.BEFOREEND);
  };
    
  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this.onDataChangefilmDetailsComponent;
      unrender(this._filmDetailsComponent.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  };

  onDataChangefilmComponent() {
    const form = this._filmComponent.getElement();
    this._tmpData.watchlist = form.querySelector(`.film-card__controls-item--add-to-watchlist`).classList.contains(`film-card__controls-item--active`),
    this._tmpData.watched = form.querySelector(`.film-card__controls-item--mark-as-watched`).classList.contains(`film-card__controls-item--active`),
    this._tmpData.favorite = form.querySelector(`.film-card__controls-item--favorite`).classList.contains(`film-card__controls-item--active`),

    this._onDataChange(this._tmpData, this._data);
    this._tmpData = null;
  }


  onDataChangefilmDetailsComponent(data) {
    this._tmpData = cloneDeep(this._data)
    console.log(this._data)
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
      
      
      console.log(this._tmpData)
    this._onDataChange(this._tmpData, this._data);
    // const test2 = new FilmDetails(this._tmpData, this._onEscKeyDown.bind(this), this.onDataChangefilmDetailsComponent.bind(this));
    // this._container.replaceChild(test2.getElement(), this._filmDetailsComponent.getElement());
    this._tmpData = null;
  }

  setDefaultView() {
    if (document.body.contains(this._moviePopup.getElement())) {
        unrender(this._moviePopup.getElement());
        this._moviePopup.removeElement()
    }
}

  onChangeView() {

  }
}