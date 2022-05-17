import initialCards from './cards.js';
import Card from './card.js';

import { validationObject } from './validationObject.js';
import FormValidator from './formValidator.js';

const cardsContainer = document.querySelector('.elements');

// переменные попапов

const popupList = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formProfile = popupProfile.querySelector('.popup__form');


const popupAddCard = document.querySelector('.popup_type_add-card');
const cardName = popupAddCard.querySelector('.popup__input_type_card-name');
const imgLink = popupAddCard.querySelector('.popup__input_type_img-link');
const formAddCard = popupAddCard.querySelector('.popup__form');

const popupImageContainer = document.querySelector('.popup_type_image');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupLabel = popupImageContainer.querySelector('.popup__label');

// переменные кнопок

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const ESC_KEY = 'Escape';

// создать карточку

function createCard(item) {
    const card = new Card(item, '#element-template', handleCardClick);
    return card.generateCard();
}

// добавить карточку в DOM

function renderCard(card) {
    cardsContainer.prepend(createCard(card));
}

// создать попап с картинкой

function handleCardClick(image) {
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupLabel.textContent = image.alt;
    openPopup(popupImageContainer);
}

// открыть попап

function openPopup(form) {
    form.classList.add('popup_opened');
    document.addEventListener('keyup', handleEscKey);
}

// закрыть попап

function closePopup(form) {
    form.classList.remove('popup_opened');
    document.removeEventListener('keyup', handleEscKey);
}

// проверить нажатие Ecs,
// передать попап с классом popup_opened в качестеве аргумента функции closePopup

function handleEscKey(event) {
    if (event.key === ESC_KEY) {
        const openedPopup = document.querySelector('.popup_opened');

        closePopup(openedPopup);
    }
}

// проверить нажатие на оверлей или крестик
// вызвать закрытие попапа

function clickToClose(event) {

    if (event.target.classList.contains('popup_opened')) {
        closePopup(event.target.closest('.popup'))
    }
    if (event.target.classList.contains('popup__close-button')) {
        closePopup(event.target.closest('.popup'))
    }

}

// подставить текущие имя и описание в поля input
// открыть попап popup_type_profile

function editProfile() {
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;

    formValidators['profile-info'].clearInputErrors();
    openPopup(popupProfile);
}

// открыть попап popup_type_add-card
// установить неактивное состояние кнопки

function addCard() {
    cardName.value = '';
    imgLink.value = '';

    formValidators['add-card'].clearInputErrors();
    formValidators['add-card'].setButtonInactive();

    openPopup(popupAddCard);
}

// обработчик submit редактирования профиля popupProfile

function handleProfileFormSubmit(evt) {
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup(popupProfile);
}

// обработчик submit добавления карточки popupAddCard

function handlePopupCardSubmit(evt) {
    const newCard = {
                      name: cardName.value,
                      link: imgLink.value
                    };

    renderCard(newCard);
    closePopup(popupAddCard);
    evt.target.reset();
}

// установить значение display: flex для попапов

function setPopupFlex () {
    popupList.forEach((el) => el.classList.add('popup_flex'));
}

setPopupFlex();

initialCards.forEach(item => renderCard(item));

// объект валидаторов форм

const formValidators = {}

// включение валидации

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)

    // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;

        validator.enableValidation();
    });
};

enableValidation(validationObject);

editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addCard);
formProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handlePopupCardSubmit);
popupList.forEach((popup) => popup.addEventListener('mousedown', clickToClose));
