import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, submitHandler) {
        super(popupSelector);

        this._popupElement = document.querySelector(popupSelector);
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._submitHandler = submitHandler;
        this._buttonSubmit = this._popupForm.querySelector('.popup__submit-button')
    }

    _getInputValues(evt) {
        const data = Object.fromEntries(new FormData(evt.target)); // получить значения полей формы
        return data;
    }

    setEventListeners() {
        super.setEventListeners()
        this._popupElement.addEventListener('submit', (evt) => this._submitHandler(this._getInputValues(evt), this._buttonSubmit));
    }

    close() {
        super.close()
        this._popupForm.reset();
    }


}
