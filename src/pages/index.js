import './index.css';

import { validationObject } from '../scripts/utils/validationObject.js';

import {
    // массив попапов
        popupList,
    // кнопки
        buttonAddCard,
        buttonEditProfile,
        buttonChangeAvatar,
    // селекторы
        // профайла
        profileNameSelector,
        profileDescriptionSelector,
        profileAvatarSelector,
        // секции с карточками
        containerWithCardsSelector,
        // попапов
        popupProfileSelector,
        popupAddCardSelector,
        popupImageSelector,
        popupCardDeleteConfirmationSelector,
        popupChangeAvatarSelector,
    // элементы попапа редактирования профайла
        popupName,
        popupDescription,
    // формы
        formAddCard,
        formProfile,
        formChangeAvatar
    } from '../scripts/utils/constants.js'

import Api from '../scripts/components/Api.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupCardDeleteConfirmation from '../scripts/components/PopupCardDeleteConfirmation.js';

// СОЗДАНИЕ КЛАССОВ

const formProfileValidator = new FormValidator(validationObject, formProfile);
const formAddCardValidator = new FormValidator(validationObject, formAddCard);
const formChangeAvatarValidator = new FormValidator(validationObject, formChangeAvatar);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
      authorization: '34cb6bbb-dff7-49e7-b585-4fe4d4886a94',
      'Content-Type': 'application/json'
    }
  });

const userInfo = new UserInfo ({profileNameSelector, profileDescriptionSelector, profileAvatarSelector});

// создать карточку
const createCard = (element) => {
    const card = new Card(element, '#element-template', { handleCardClick, handleDeleteButtonClick, handleLikeButtonClick });
    return card.generateCard();
}

const cardsList = new Section( {
    renderer: (item) => {
        cardsList.addItem(createCard(item));
        }
    },
    containerWithCardsSelector
);

const popupWithFormProfile = new PopupWithForm(popupProfileSelector, 'Сохранить', 'Сохранение...', (data) => {
    popupWithFormProfile.renderLoading(true, );
    api.patchUserInfo(data)
        .then(res => {
            userInfo.setUserInfo(res);
            popupWithFormProfile.close();
            popupWithFormProfile.renderLoading(false);
        })
        .catch(err => console.log(err))
        .finally(() => popupWithFormProfile.renderLoading(false));
});

const popupWithFormAddCard = new PopupWithForm(popupAddCardSelector, 'Создать', 'Создание...',(data) => {
    popupWithFormAddCard.renderLoading(true);
    api.postNewCard(data)
        .then(res => {
            res.currentUserId = res.owner._id;
            cardsList.addItem(createCard(res));
            popupWithFormAddCard.close();
            popupWithFormAddCard.renderLoading(false);
        })
        .catch(err => console.log(err))
        .finally(() => popupWithFormAddCard.renderLoading(false));
});

const popupWithFormChangeAvatar = new PopupWithForm(popupChangeAvatarSelector, 'Сохранить', 'Сохранение...', (data) => {
    popupWithFormChangeAvatar.renderLoading(true);
    api.patchNewAvatar(data)
        .then(res => {
            userInfo.setUserInfo(res);
            popupWithFormChangeAvatar.close();
        })
        .catch(err => console.log(err))
        .finally(() => popupWithFormChangeAvatar.renderLoading(false));
});

const popupWithImage = new PopupWithImage(popupImageSelector);

const popupCardDeleteConfirmation = new PopupCardDeleteConfirmation(popupCardDeleteConfirmationSelector, (cardToDelete) => {
    api.deleteCard(cardToDelete.getId())
        .then(() => {
            cardToDelete.removeCard();
            popupCardDeleteConfirmation.close();
        })
        .catch(err => console.log(err));
});

// ОТРИСОВКА ЭЛЕМЕНТОВ

// установить значение display: flex для попапов
const addClassFlex = (elements) => {
    elements.forEach(el => el.classList.add('flex'));
}

Promise.all([
    api.getInitialUserInfo(),
    api.getInitialCards()
    ])
    .then((values)=>{
        const userData = values[0];
        const cardData = values[1];
        cardData.forEach((el) => el.currentUserId = userData._id);

        userInfo.setUserInfo(userData);
        cardsList.renderItem(cardData);

        addClassFlex(popupList);
    })
    .catch(err => console.log(err));

// ОБРАБОТЧИКИ КЛИКОВ

// обработчик клика на кнопку изменения аватара
const changeAvatar = () => {
    formChangeAvatarValidator.clearInputErrors(formChangeAvatar);
    formChangeAvatarValidator.setButtonInactive(formChangeAvatar);

    popupWithFormChangeAvatar.open();
}
// обработчик клика редактирования профиля
const editProfile = () => {
    formProfileValidator.clearInputErrors(formProfile);
    // подставить данные пользователя в форму
    const userInfoData = userInfo.getUserInfo();
    popupName.value = userInfoData.profileName;
    popupDescription.value = userInfoData.profileDescription;

    popupWithFormProfile.open();
}

// обработчик клика добавления карточки
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

// обработчик клика на кнопку Delete
const handleDeleteButtonClick = (card) => {
    popupCardDeleteConfirmation.open(card);
}

// обработчик клика на кнопку Like
const handleLikeButtonClick = (card, likeButton) => {
    if (likeButton.classList.contains('element__like_active')) {
        api.deleteLike(card.getId())
        .then((res) => {
            card.updateLikes(res);
        })
        .catch(err => console.log(err));
    } else {
        api.putLike(card.getId())
        .then((res) => {
            card.updateLikes(res)
        })
        .catch(err => console.log(err));
    }
}

// СЛУШАТЕЛИ
popupWithFormAddCard.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormChangeAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupCardDeleteConfirmation.setEventListeners();

buttonEditProfile.addEventListener('click', editProfile);
buttonAddCard.addEventListener('click', addCard);
buttonChangeAvatar.addEventListener('click', changeAvatar);

// ВАЛИДАЦИЯ
formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
formChangeAvatarValidator.enableValidation();
