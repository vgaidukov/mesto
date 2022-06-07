import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, submitHandler){
        super(popupSelector);

        this._submitHandler = submitHandler.bind(this);
    }

    _getInputValues() {

    }

    setEventListeners() {
        document.addEventListener('keyup',this._escHandler);
        this._popupSelector.addEventListener('mousedown', this._clickToCloseHandler);
        this._popupSelector.addEventListener('submit', this._submitHandler);
    }

    _removerEventListeners() {
        document.removeEventListener('keyup', this._escHandler);
        this._popupSelector.removeEventListener('mousedown', this._clickToCloseHandler);
        this._popupSelector.removeEventListener('submit', this._submitHandler);
    }


}
