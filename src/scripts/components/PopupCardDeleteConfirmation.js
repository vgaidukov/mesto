import Popup from "./Popup.js";

export default class PopupCardDeleteConfirmation extends Popup{
    constructor(popupSelector, confirmHandler) {
        super(popupSelector);

        this._popupElement = document.querySelector(popupSelector);
        this._confirmHandler = confirmHandler;
    }

    open(element, elementId) {
        this._cardToDelete = element;
        this._cardToDeleteId = elementId;

        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('click', (evt) => this._confirmHandler(this._cardToDelete, this._cardToDeleteId));
    }
}
