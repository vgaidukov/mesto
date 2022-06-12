import './index.css';

import initialCards from '../scripts/utils/cards.js';
import { validationObject } from '../scripts/utils/validationObject.js';

import { addButton,
        editButton,
        cardName,
        cardsContainer,
        formAddCard,
        formProfile,
        imgLink,
        profileDescription,
        profileName,
        popupAddCard,
        popupDescription,
        popupImageContainer,
        popupList,
        popupName,
        popupProfile
    } from '../scripts/utils/constants.js'

import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';

// установить значение display: flex для попапов
const popupSetFlex = () => {
    popupList.forEach((el) => el.classList.add('popup_flex'));
}

const formProfileValidator = new FormValidator(validationObject, formProfile);
const formAddCardValidator = new FormValidator(validationObject, formAddCard);

// создать экземпляр класса PopupWithForm для popup_type_profile
const popupWithFormProfile = new PopupWithForm(popupProfile, (evt) => { // передать селектор формы и обработчик сабмита в конструктор класса
    userInfo.setUserInfo(popupWithFormProfile.getInputValues(evt)); // добавить данные пользователя на страницу из полей формы по сабмиту
    popupWithFormProfile.close();
});

// создать экземпляр класса PopupWithForm для popup_type_add-card
const popupWithFormAddCard = new PopupWithForm(popupAddCard, (evt) => { // передать селектор формы и обработчик сабмита в конструктор класса
    // создать объект со значениями полей формы
    const newCard = {
        name: cardName.value,
        link: imgLink.value
    };
    // создать и добавить новый экземляр класса Card в секцию с карточками
    const card = new Card(newCard, '#element-template', handleCardClick);
    cardsContainer.prepend(card.generateCard());
    popupWithFormAddCard.close();
});

const popupWithImage = new PopupWithImage(popupImageContainer);

const userInfo = new UserInfo ({profileName, profileDescription});

const editProfile = () => {

    // очистить ошибки
    formProfileValidator.clearInputErrors(formProfile);

    // подставить данные пользователя в форму
    popupName.value = userInfo.getUserInfo().profileName;
    popupDescription.value = userInfo.getUserInfo().profileDescription;

    // установить слушатели и открыть попап popup_type_profile
    popupWithFormProfile.open();
}

const addCard = () => {
    //очистить ошибки, неактивное состояние кнопки
    formAddCardValidator.clearInputErrors(formAddCard);
    formAddCardValidator.setButtonInactive(formAddCard);

    popupWithFormAddCard.open();
}

// обработчик клика на карточку
const handleCardClick = (image) => {
    popupWithImage.open({
        src: image.src,
        alt: image.alt,
        textContent: image.alt
    });
}

// отрисовка секции с карточками из начального объекта
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#element-template', handleCardClick);
        cardsContainer.prepend(card.generateCard());
    }
});

cardsList.renderItem();

popupSetFlex();

// установить слушатели
popupWithFormAddCard.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();

//запустить валидацию
formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addCard);
