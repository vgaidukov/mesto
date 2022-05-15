export const validationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }

// очистить ошибки ввода и состояние кнопки при закрытии формы

const clearInputErrors = (popupElement, validationConfig) => {
    const inputList = Array.from(popupElement.querySelectorAll(validationConfig.inputSelector));

    inputList.forEach((inputElement) => {
        hideInputError(popupElement, inputElement, validationConfig)
    });
}

// показать сообщение ошибки поля ввода

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

// скрыть сообщение ошибки поля ввода

const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(validationConfig.errorClass);
};


// проверить валидности формы

const isValid = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

// проверить наличие невалидного поля

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// установить неактивное состояние кнопки

const setButtonInactive = (buttonElement, validationConfig) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

const setButtonActive = (buttonElement, validationConfig) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}


// изменить состояние кнопки в зависимости от валидности полей

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        setButtonInactive(buttonElement, validationConfig);
    } else {
        setButtonActive(buttonElement, validationConfig);
    }
};

// навесить слушатели на поля ввода, вызвать проверку валидности
// установить состояние кнопки

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig)
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

// отменить стандартное поведение по нажатию submit

export function enableValidation (validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig);
    });
};
