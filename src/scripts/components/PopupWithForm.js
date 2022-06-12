import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, submitHandler){
        super(popupSelector);

        this._submitHandler = submitHandler.bind(this);
        this._popupForm = this._popupSelector.querySelector('.popup__form');
    }

    getInputValues(event) {
        const data = Object.fromEntries(new FormData(event.target)); // получить значения полей формы
        return data;
    }

    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', this._clickToCloseHandler);
        this._popupSelector.addEventListener('submit', this._submitHandler);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
        this._popupForm.reset();
    }


}
