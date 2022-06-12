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
        this._clickToCloseHandler = (event) => {
            const target = event.target;
            if ((target.classList.contains('popup')) || (target.classList.contains('popup__close-button'))) {
                this.close();
            }
        }
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup',this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
//        this._removeEventListeners();
    }

    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', this._clickToCloseHandler);
    }
}
