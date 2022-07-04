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
        formChangeAvatar,

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

// установить текст кнопки сабмита
const setSubmitButtonText = (button, text) => {
    button.textContent = text;
}

const popupWithFormProfile = new PopupWithForm(popupProfileSelector, (data, button) => {
    setSubmitButtonText(button, 'Сохранение...');
    api.patchUserInfo(data)
        .then(res => {
            userInfo.setUserInfo(res);
            popupWithFormProfile.close();
            setTimeout(setSubmitButtonText, 300, button, 'Сохоранить');
        })
        .catch(err => console.log(err));
});

const popupWithFormAddCard = new PopupWithForm(popupAddCardSelector, (data, button) => {
    setSubmitButtonText(button, 'Создание...');
    api.postNewCard(data)
        .then(res => {
            cardsList.addItem(createCard(res));
            popupWithFormAddCard.close();
            setTimeout(setSubmitButtonText, 300, button, 'Создать');
        })
        .catch(err => console.log(err));
});

const popupWithFormChangeAvatar = new PopupWithForm(popupChangeAvatarSelector, (data, button) => {
    setSubmitButtonText(button, 'Сохранение...');
    api.patchNewAvatar(data)
        .then(res => {
            userInfo.setUserInfo(res);
            popupWithFormChangeAvatar.close();
            setTimeout(setSubmitButtonText, 300, button, 'Сохранить');
        })
        .catch(err => console.log(err));
});

const popupWithImage = new PopupWithImage(popupImageSelector);

const popupCardDeleteConfirmation = new PopupCardDeleteConfirmation(popupCardDeleteConfirmationSelector, (element, elementId) => {
    api.deleteCard(elementId)
        .then(() => {
            element.remove();
            element = null;
            popupCardDeleteConfirmation.close();
        })
        .catch(err => console.log(err));
});

// ОТРИСОВКА ЭЛЕМЕНТОВ

// отрисовка профиля
api.getInitialUserInfo()
    .then(res => {
        userInfo.setUserInfo(res)
    })
    .catch(err => console.log(err));

// отрисовка секции с карточками
api.getInitialCards()
    .then(result => {
        cardsList.renderItem(result);
    })
    .catch(err => console.log(err));

// установить значение display: flex для попапов
const addClassFlex = (elements) => {
    elements.forEach(el => el.classList.add('flex'));
}

setTimeout(addClassFlex, 1000, popupList);

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
const handleDeleteButtonClick = (element, elementId) => {
    popupCardDeleteConfirmation.open(element, elementId);
}

// установить количество лайков и состояние кнопки Like
const updateLikes = (card, counter, likeButton) => {
    counter.textContent = card.likes.length;
    likeButton.classList.toggle('element__like_active');
}

// обработчик клика на кнопку Like
const handleLikeButtonClick = (element, elementId, likeCounter) => {
    if (element.classList.contains('element__like_active')) {
        api.deleteLike(elementId)
        .then(result => {
            updateLikes(result, likeCounter, element)
        })
        .catch(err => console.log(err));
    } else {
        api.putLike(elementId)
        .then(result => {
            updateLikes(result, likeCounter, element)
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
