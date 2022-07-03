export default class FormValidator {
    constructor(data, formElement) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;

        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList =  Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    enableValidation() {
        this._hendlerSubmitButtonClick();
    }

    _hendlerSubmitButtonClick() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _isValid (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.setButtonInactive();
        } else {
            this.setButtonActive();
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    setButtonInactive() {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._inactiveButtonClass);
    }

    setButtonActive() {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._inactiveButtonClass);
    }

    clearInputErrors() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }


    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }
}
