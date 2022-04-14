const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }

// очистить ошибки ввода и состояние кнопки при закрытии формы

const clearInputErrors = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    // проверить, есть ли в попапе есть поля ввода
    if (inputList.length > 0) {
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement)
        });
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}

// показать сообщение ошибки поля ввода

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

// скрыть сообщение ошибки поля ввода

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(validationConfig.errorClass);
};


// проверить валидности формы

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// проверить наличие невалидного поля

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// изменить состояние кнопки в зависимости от валидности полей

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabeles = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabeles = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

// навесить слушатели на поля ввода, вызвать проверку валидности
// установить состояние кнопки

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement)
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// отменить стандартное поведение по нажатию submit

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};
