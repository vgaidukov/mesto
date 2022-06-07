import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, submitHandler){
        super(popupSelector);

        this._submitHandler = submitHandler.bind(this);
        this._popupForm = this._popupSelector.querySelector('.popup__form');
    }

    _getInputValues(event) {
        const data = Object.fromEntries(new FormData(event.target));
        console.log(data);
    }

    setEventListeners() {
        document.addEventListener('keyup',this._escHandler);
        this._popupSelector.addEventListener('mousedown', this._clickToCloseHandler);
        this._popupSelector.addEventListener('submit', this._getInputValues);
        this._popupSelector.addEventListener('submit', this._submitHandler);
    }

    _removerEventListeners() {
        document.removeEventListener('keyup', this._escHandler);
        this._popupSelector.removeEventListener('mousedown', this._clickToCloseHandler);
        this._popupSelector.removeEventListener('submit', this._submitHandler);
    }

    close() {

        this._popupSelector.classList.remove('popup_opened');
        this._removerEventListeners();
        this._popupForm.reset();
    }


}
