import initialCards from './cards.js';

import Section from './components/Section.js';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

import { validationObject } from './validationObject.js';
import FormValidator from './components/FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileDescription = document.querySelector('.profile__description');
const profileName = document.querySelector('.profile__name');

// переменные попапов
const popupImageContainer = document.querySelector('.popup_type_image');
const popupList = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');

const popupAddCard = document.querySelector('.popup_type_add-card');
const cardName = popupAddCard.querySelector('.popup__input_type_card-name');
const imgLink = popupAddCard.querySelector('.popup__input_type_img-link');


function editProfile() {
// создать экземпляр класса PopupWithForm для popup_type_profile
    const popupWithForm = new PopupWithForm(popupProfile, (evt) => { // передать селектор формы и обработчик сабмита в конструктор класса
        evt.preventDefault();
        userInfo.setUserInfo(popupWithForm.getInputValues(evt)); // добавить данные пользователя на страницу из полей формы по сабмиту
        popupWithForm.close();
    });

//запустить валидацию и очистить ошибки
    const formElement = popupProfile.querySelector('.popup__form');
    const formValidator = new FormValidator(validationObject, formElement);
    formValidator.enableValidation();
    formValidator.clearInputErrors(formElement);

// подставить данные пользователя в форму
    const userInfo = new UserInfo ({profileName, profileDescription});
    popupName.value = userInfo.getUserInfo().profileName;
    popupDescription.value = userInfo.getUserInfo().profileDescription;

// установить слушатели и открыть попап popup_type_profile
    popupWithForm.setEventListeners();
    popupWithForm.open();
}

function addCard() {
//запустить валидацию и очистить ошибки, неактивное состояние кнопки
    const formElement = popupAddCard.querySelector('.popup__form');
    const formValidator = new FormValidator(validationObject, formElement);
    formValidator.enableValidation();
    formValidator.clearInputErrors(formElement);
    formValidator.setButtonInactive(formElement);

// создать экземпляр класса PopupWithForm для popup_type_add-card
    const popupWithForm = new PopupWithForm(popupAddCard, (evt) => { // передать селектор формы и обработчик сабмита в конструктор класса
            evt.preventDefault();
            // создать объект со значениями полей формы
            const newCard = {
                name: cardName.value,
                link: imgLink.value
            };
            // создать и добавить новый экземляр класса Card в секцию с карточками
            const card = new Card(newCard, '#element-template', handleCardClick);
            cardsContainer.prepend(card.generateCard());

            popupWithForm.close();
        });

// установить слушатели и открыть попап popup_type_add-card
    popupWithForm.setEventListeners();
    popupWithForm.open();
}

// обработчик клика на карточку
function handleCardClick(image) {
    const popupWithImage = new PopupWithImage(popupImageContainer);
    popupWithImage.setEventListeners();
    popupWithImage.open({
        src: image.src,
        alt: image.alt,
        textContent: image.alt
    });
}

// установить значение display: flex для попапов
function popupSetFlex () {
    popupList.forEach((el) => el.classList.add('popup_flex'));
}
popupSetFlex();

// отрисовка секции с карточками из начального объекта
const cardsContainer = document.querySelector('.elements');
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#element-template', handleCardClick);
        cardsContainer.prepend(card.generateCard());
    }
});
cardsList.renderItem();

// навесить слушатели кнопок профиля
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addCard);
