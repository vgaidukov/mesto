import './index.css';

import initialCards from '../scripts/utils/cards.js';
import { validationObject } from '../scripts/utils/validationObject.js';

import { buttonAddCard,
        buttonEditProfile,
        cardName,
        cardsContainer,
        formAddCard,
        formProfile,
        imgLink,
        profileNameSelector,
        profileDescriptionSelector,
        popupAddCardSelector,
        popupProfileSelector,
        popupDescription,
        popupImageSelector,
        popupList,
        popupName
    } from '../scripts/utils/constants.js'

import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';

// установить значение display: flex для попапов
const setPopupFlex = () => {
    popupList.forEach((el) => el.classList.add('popup_flex'));
}

setPopupFlex();

const formProfileValidator = new FormValidator(validationObject, formProfile);
const formAddCardValidator = new FormValidator(validationObject, formAddCard);

const userInfo = new UserInfo ({profileNameSelector, profileDescriptionSelector});

const popupWithFormProfile = new PopupWithForm(popupProfileSelector, (data) => {
    userInfo.setUserInfo(data);
    popupWithFormProfile.close();
});

const popupWithFormAddCard = new PopupWithForm(popupAddCardSelector, (data) => {
    const newCard = {
        name: data['card-name'],
        link: data['img-link']
    };
    cardsList.addItem(createCard(newCard));
    popupWithFormAddCard.close();
});

const popupWithImage = new PopupWithImage(popupImageSelector);

const cardsList = new Section( {
    items: initialCards,
    renderer: (item) => {
        cardsList.addItem(createCard(item));
    }
    },
    cardsContainer
);

const editProfile = () => {
    formProfileValidator.clearInputErrors(formProfile);

    // подставить данные пользователя в форму
    const userInfoData = userInfo.getUserInfo();
    popupName.value = userInfoData.profileName;
    popupDescription.value = userInfoData.profileDescription;

    popupWithFormProfile.open();
}

const addCard = () => {
    formAddCardValidator.clearInputErrors(formAddCard);
    formAddCardValidator.setButtonInactive(formAddCard);

    popupWithFormAddCard.open();
}

// обработчик клика на карточку
const handleCardClick = (name, link) => {
    popupWithImage.open({
        src: link,
        alt: name,
        textContent: name
    });
}

// создать карточку
const createCard = (element) => {
    const card = new Card(element, '#element-template', handleCardClick);
    return card.generateCard();
}

// отрисовка секции с карточками
cardsList.renderItem();

// установить слушатели
popupWithFormAddCard.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();

buttonEditProfile.addEventListener('click', editProfile);
buttonAddCard.addEventListener('click', addCard);

// запустить валидацию
formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
