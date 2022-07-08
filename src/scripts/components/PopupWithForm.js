import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, textButtonSubmit, textButtonSubmitLoading, submitHandler) {
        super(popupSelector);

        this._popupElement = document.querySelector(popupSelector);
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._submitHandler = submitHandler;
        this._buttonSubmit = this._popupForm.querySelector('.popup__submit-button');
        this._textButtonSubmit = textButtonSubmit;
        this._textButtonSubmitLoading = textButtonSubmitLoading;
    }

    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
      }

    setEventListeners() {
        super.setEventListeners()
        this._popupElement.addEventListener('submit', () => this._submitHandler(this._getInputValues(), this._buttonSubmit.textContent));
    }

    renderLoading(isLoading) {
        if (isLoading) {
          this._buttonSubmit.textContent = this._textButtonSubmitLoading;
          return;
        }
        this._buttonSubmit.textContent = this._textButtonSubmit;
      }

    close() {
        super.close()
        this._popupForm.reset();
    }


}
