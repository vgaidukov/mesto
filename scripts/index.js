// переменные для создания и добавления карточек

const cardsContainer = document.querySelector('.elements');

// переменные попапов

const popup = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupAddCard = document.querySelector('.popup_type_add-card');
const cardName = popupAddCard.querySelector('.popup__input_type_card-name');
const imgLink = popupAddCard.querySelector('.popup__input_type_img-link');

const popupImageContainer = document.querySelector('.popup_type_image');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupLabel = popupImageContainer.querySelector('.popup__label');

// переменные кнопок

const closeButton = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const ESC_KEY = 'Escape';

//добавить карточку в DOM

function renderCard(item) {
    cardsContainer.prepend(createCard(item));
}

// создать карточку
// навесить случатели на кнопки like, delete, просмотр карточки; выполнить действие

function createCard(item) {
    const template = document.querySelector('#element-template');
    const card = template.content.querySelector('.element').cloneNode(true);
    const cardImage = card.querySelector('.element__image');
    const cardName = card.querySelector('.element__name');
    const deleteButton = card.querySelector('.element__delete');
    const likeButton = card.querySelector('.element__like');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardName.textContent = item.name;

    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like_active');
    });

    deleteButton.addEventListener('click', () => {
        card.remove();
    });

    cardImage.addEventListener('click', renderPopupImageContainer);

    return card;
}

// создать попап с картинкой

function renderPopupImageContainer (event) {
    const target = event.target;

    popupImage.src = target.src;
    popupImage.alt = target.alt;
    popupLabel.textContent = target.alt;
    openPopup(popupImageContainer);
}

// открыть попап

function openPopup(form) {
    form.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp);
}

// закрыть попап

function closePopup(form) {
    form.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
}

// проверить нажатие Ecs,
// передать попап с классом popup_opened в качестеве аргумента функции closePopup

function onDocumentKeyUp(event) {
    if (event.key === ESC_KEY) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

// передать попап, на кнопку закрытия которого было нажатие,
// в качестеве аргумента функции closePopup

function clickOnCloseButton(event) {
    const target = event.target;
    closePopup(target.closest('.popup'));
    clearInputErrors(target.closest('.popup'));
}

// подставить текущие имя и описание в поля input
// открыть попап popup_type_profile
// вызвать обработчик по событию submit

function editProfile() {
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
    openPopup(popupProfile);

}

// открыть попап popup_type_add-card
// установить неактивное состояние кнопки
// вызвать обработчик по событию submit

function addCard() {
    const buttonElement = popupAddCard.querySelector('.popup__submit-button');

    buttonElement.classList.add('popup__submit-button_inactive');

    cardName.value = '';
    imgLink.value = '';
    openPopup(popupAddCard);
}

// обработчик submit редактирования профиля popupProfile

function popupProfileSubmitHandler (evt) {
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup(popupProfile);
}

// обработчик submit добавления карточки popupAddCard

function popupCardSubmitHandler (evt) {
    const newCard = {
                      name: cardName.value,
                      link: imgLink.value
                    };
    renderCard(newCard);
    closePopup(popupAddCard);
    cardName.value = '';
    imgLink.value = '';
}

// установить значение display: flex для попапов

function popupSetFlex () {
    popup.forEach((el) => el.style.display = 'flex');
}

//==================================================//

// очистить ошибки ввода и состояние кнопки при закрытии формы

const clearInputErrors = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');

    // проверить, есть ли в попапе есть поля ввода
    if (inputList.length > 0) {
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement)
        });
        buttonElement.classList.remove('popup__submit-button_inactive');
    }
}

// показать сообщение ошибки поля ввода

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

// скрыть сообщение ошибки поля ввода

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
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
        buttonElement.classList.add('popup__submit-button_inactive');
    } else {
        buttonElement.classList.remove('popup__submit-button_inactive');
    }
};

// навесить слушатели на поля ввода, вызвать проверку валидности
// установить состояние кнопки

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement)
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// отменить стандартное поведение по нажатию submit

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

popupSetFlex();
initialCards.forEach(renderCard);
enableValidation();
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addCard);
closeButton.forEach((element) => element.addEventListener('click', clickOnCloseButton));
popupProfile.addEventListener('submit', popupProfileSubmitHandler);
popupAddCard.addEventListener('submit', popupCardSubmitHandler);
