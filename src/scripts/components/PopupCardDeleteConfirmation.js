import Popup from "./Popup.js";

export default class PopupCardDeleteConfirmation extends Popup{
    constructor(popupSelector, confirmHandler) {
        super(popupSelector);

        this._popupElement = document.querySelector(popupSelector);
        this._confirmHandler = confirmHandler;
    }

    open(card) {
        this._cardToDelete = card;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('click', () => this._confirmHandler(this._cardToDelete));
    }
}
