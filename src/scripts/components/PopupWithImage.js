import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super (popupSelector);

        this._popupElement = document.querySelector(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._popupLabel = this._popupElement.querySelector('.popup__label');
    }

    open(data) {
        this._popupImage.src = data.src;
        this._popupImage.alt = data.alt;
        this._popupLabel.textContent = data.textContent;

        super.open()
    }
}
