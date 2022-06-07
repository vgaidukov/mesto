export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;

        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose.bind(this));
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose.bind(this));
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', this._clickToClose.bind(this));
        this._popupSelector.addEventListener('mousedown', this._clickToClose.bind(this));
    }

    _clickToClose(event) {
        const target = event.target;
        if ((target.classList.contains('popup')) || (target.classList.contains('popup__close-button'))) {
            this.close();
        }
    }
}
