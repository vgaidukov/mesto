import './index.css';

//import initialCards from '../scripts/utils/cards.js';
import { validationObject } from '../scripts/utils/validationObject.js';

import { buttonAddCard,
        buttonEditProfile,
        //cardName,
        cardsContainer,
        formAddCard,
        formProfile,
        //imgLink,
        profileNameSelector,
        profileDescriptionSelector,
        profileAvatarSelector,
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
import Api from '../scripts/components/Api.js';

// установить значение display: flex для попапов
const setPopupFlex = () => {
    popupList.forEach((el) => el.classList.add('popup_flex'));
}

setPopupFlex();

const formProfileValidator = new FormValidator(validationObject, formProfile);
const formAddCardValidator = new FormValidator(validationObject, formAddCard);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
      authorization: '34cb6bbb-dff7-49e7-b585-4fe4d4886a94',
      'Content-Type': 'application/json'
    }
  });

const userInfo = new UserInfo ({profileNameSelector, profileDescriptionSelector, profileAvatarSelector});

const popupWithFormProfile = new PopupWithForm(popupProfileSelector, (data) => {
    api.patchUserInfo(data)
        .then(res => {
            //console.log(res);
            userInfo.setUserInfo(res);
            popupWithFormProfile.close();
        })
        .catch(err => console.log(err));
});

const popupWithFormAddCard = new PopupWithForm(popupAddCardSelector, (data) => {
    /*const newCard = {
        name: data['card-name'],
        link: data['img-link']
    };*/
    api.postNewCard(data)
        .then(res => {
            cardsList.addItem(createCard(res));
            popupWithFormAddCard.close();
        })
        .catch(err => console.log(err));
});

const popupWithImage = new PopupWithImage(popupImageSelector);

//отрисовка профиля
api.getInitialUserInfo()
    .then(res => {
        userInfo.setUserInfo(res);
    })
    .catch(err => console.log(err));

// отрисовка секции с карточками'
const cardsList = new Section( {
                items: [],
                renderer: (item) => {
                    cardsList.addItem(createCard(item));
                }
            },
            cardsContainer);

api.getInitialCards()
    .then(result => {
        /*const cardsList = new Section( {
                items: result,
                renderer: (item) => {
                    cardsList.addItem(createCard(item));
                }
            },
            cardsContainer);*/
            console.log(result);
        cardsList.renderItem(result);
    })
    .catch(err => console.log(err));

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

// установить слушатели
popupWithFormAddCard.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();

buttonEditProfile.addEventListener('click', editProfile);
buttonAddCard.addEventListener('click', addCard);

// запустить валидацию
formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
