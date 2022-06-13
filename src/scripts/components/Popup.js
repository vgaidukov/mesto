export default class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._escButtonHandler = this._handleEscButton.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keyup',this._escButtonHandler);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._escButtonHandler);
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', this._handleClickToClose);
    }

    _handleEscButton(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _handleClickToClose = (event) => {
        const target = event.target;
        if ((target.classList.contains('popup')) || (target.classList.contains('popup__close-button'))) {
            this.close();
        }
    }
}
