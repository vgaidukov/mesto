export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;

        // функция-обработчик закрытия попапа по нажатию на Esc
        this._escCloseHandler = function(event) {
            if (event.key === 'Escape') {
                this.close();
            }
        }
        this._handleEscClose = this._escCloseHandler.bind(this); // приватное свойство с функцией-обработчиком для удаления слушателя

        // функция-обработчик закрытия попапа по нажатию на оверлей или крест
        this._clickToClose = function(event) {
            const target = event.target;
            if ((target.classList.contains('popup')) || (target.classList.contains('popup__close-button'))) {
                this.close();
            }
        }
        this._clickToCloseHandler = this._clickToClose.bind(this); // приватное свойство с функцией-обработчиком для удаления слушателя
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        this._removeEventListeners();
    }

    setEventListeners() {
        document.addEventListener('keyup',this._handleEscClose);
        this._popupSelector.addEventListener('mousedown', this._clickToCloseHandler);
    }

    _removeEventListeners() {
        document.removeEventListener('keyup', this._handleEscClose);
        this._popupSelector.removeEventListener('mousedown', this._clickToCloseHandler);
    }
}
