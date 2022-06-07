import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super (popupSelector);

        this._popupImage = this._popupSelector.querySelector('.popup__image');
        this._popupLabel = this._popupSelector.querySelector('.popup__label');
    }

    open(data) {
        this._popupImage.src = data.src;
        this._popupImage.alt = data.alt;
        this._popupLabel.textContent = data.textContent;

        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose.bind(this));
    }
}
