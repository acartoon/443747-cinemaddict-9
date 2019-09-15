import {render, unrender, Position, Key} from "../utils";
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
    this._filmComponent = new Film(this._data, this._onEscKeyDown.bind(this), this._renderFilmDetails.bind(this), this.onDataChange.bind(this));
    this._popup = new Popup;
    this._filmDetails = new FilmDetails(this._data, this._onEscKeyDown.bind(this), this.onDataChange.bind(this), this._onClosePopup.bind(this), this._onSendMsg.bind(this));
    
    this._tmpData = null;
    this._formDetailsRating = null;
    
  }

  _initTmpData() {
    this._tmpData = cloneDeep(this._data);
  }

  _resetTmpData() {
    this._tmpData = null;
  }

  _onClosePopup() {
    unrender(this._popup.getElement());
    this._popup.removeElement();

  }

  init() {
    render(this._container, this._filmComponent.getElement(), this._place);

    if(document.querySelector(`.film-details`)) {
      const popup = document.querySelector(`.film-details`);
      this._filmDetails = new FilmDetails(this._data, this._onEscKeyDown.bind(this), this.onDataChange.bind(this), this._onClosePopup.bind(this), this._onSendMsg.bind(this));
      popup.replaceChild(this._filmDetails.getElement(), popup.lastChild);
    }
  }

  _renderFilmDetails() {
    render(document.body, this._popup.getElement(), Position.BEFOREEND);
    render(this._popup.getElement(), this._filmDetails.getElement(), Position.BEFOREEND);
    this._onChangeView();
  };

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this.onDataChangePopup;
      this._onClosePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  };

    _onSendMsg(evt) {
    if (evt.key == `Enter` && (event.ctrlKey || event.metaKey)) {
      console.log(`enter`)
      document.removeEventListener(`keydown`, this._onSendMsg);
    }  
  }

  onDataChange(data) {
    this._initTmpData();
    
    if(data === `watchlist`) {
      this._tmpData.watchlist = !this._tmpData.watchlist;
    }
    else if (data === `watched`) {
      this._tmpData.watched = !this._tmpData.watched;
      this._tmpData.ownrating = null;
    }
    else if (data === `favorite`){
      this._tmpData.favorite = !this._tmpData.favorite
    }
    else if (typeof data === `number`) {
      console.log(data)

      this._tmpData.ownrating = data;
    }
    
    this._onDataChange(this._tmpData, this._data);
    this._resetTmpData();
  }

  setDefaultView() {
    if (document.body.contains(this._filmDetails.getElement())) {
      unrender(this._filmDetails.getElement());
      this._filmDetails.removeElement()
    }
  }
}
