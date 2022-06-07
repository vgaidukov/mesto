export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;

        this._handleEscClose = function(event) {
            if (event.key === 'Escape') {
                this.close();
            }
        }
        this._escHandler = this._handleEscClose.bind(this);

        this._clickToClose = function(event) {
            const target = event.target;
            if ((target.classList.contains('popup')) || (target.classList.contains('popup__close-button'))) {
                this.close();
            }
        }
        this._clickToCloseHandler = this._clickToClose.bind(this);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        this._removerEventListeners();
    }

    setEventListeners() {
        document.addEventListener('keyup',this._escHandler);
        this._popupSelector.addEventListener('mousedown', this._clickToCloseHandler);
    }

    _removerEventListeners() {
        document.removeEventListener('keyup', this._escHandler);
        this._popupSelector.removeEventListener('mousedown', this._clickToCloseHandler);
    }
}
