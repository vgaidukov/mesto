import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupElement, submitHandler){
        super(popupElement);

        this._submitHandler = submitHandler.bind(this);
        this._popupForm = this._popupElement.querySelector('.popup__form');
    }

    getInputValues(event) {
        const data = Object.fromEntries(new FormData(event.target)); // получить значения полей формы
        return data;
    }

    setEventListeners() {
        super.setEventListeners()
        this._popupElement.addEventListener('submit', this._submitHandler);
    }

    close() {
        super.close()
        this._popupForm.reset();
    }


}
