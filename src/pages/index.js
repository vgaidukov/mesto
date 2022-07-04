import './index.css';

import { validationObject } from '../scripts/utils/validationObject.js';

import { buttonAddCard,
        buttonEditProfile,
        buttonChangeAvatar,
        cardsContainer,
        formAddCard,
        formProfile,
        formChangeAvatar,
        profileNameSelector,
        profileDescriptionSelector,
        profileAvatarSelector,
        popupAddCardSelector,
        popupProfileSelector,
        popupChangeAvatarSelector,
        popupCardDeleteConfirmationSelector,
        popupDescription,
        popupImageSelector,
        popupList,
        popupName
    } from '../scripts/utils/constants.js'

import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupCardDeleteConfirmation from '../scripts/components/PopupCardDeleteConfirmation.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Api from '../scripts/components/Api.js';

// установить значение display: flex для попапов
const setPopupFlex = () => {
    popupList.forEach((el) => el.classList.add('popup_flex'));
}

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

const cardsList = new Section( {
    renderer: (item) => {
        cardsList.addItem(createCard(item));
        }
    },
    cardsContainer
);

const popupWithFormProfile = new PopupWithForm(popupProfileSelector, (data) => {
    api.patchUserInfo(data)
        .then(res => {
            userInfo.setUserInfo(res);
            popupWithFormProfile.close();
        })
        .catch(err => console.log(err));
});

const popupWithFormAddCard = new PopupWithForm(popupAddCardSelector, (data) => {
    api.postNewCard(data)
        .then(res => {
            cardsList.addItem(createCard(res));
            popupWithFormAddCard.close();
        })
        .catch(err => console.log(err));
});

const popupWithFormChangeAvatar = new PopupWithForm(popupChangeAvatarSelector, (data) => {
    console.log(data)
    api.patchNewAvatar(data)
        .then(res => {
            userInfo.setUserInfo(res);
            popupWithFormChangeAvatar.close();
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

//отрисовка профиля
api.getInitialUserInfo()
    .then(res => {
        userInfo.setUserInfo(res);
        setPopupFlex();
    })
    .catch(err => console.log(err));

// отрисовка секции с карточками
api.getInitialCards()
    .then(result => {
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

// создать карточку
const createCard = (element) => {
    const card = new Card(element, '#element-template', { handleCardClick, handleDeleteButtonClick, handleLikeButtonClick });
    return card.generateCard();
}

const changeAvatar = () => {
    formChangeAvatarValidator.clearInputErrors(formChangeAvatar);
    formChangeAvatarValidator.setButtonInactive(formChangeAvatar);

    popupWithFormChangeAvatar.open();

}

// установить слушатели
popupWithFormAddCard.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormChangeAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupCardDeleteConfirmation.setEventListeners();

buttonEditProfile.addEventListener('click', editProfile);
buttonAddCard.addEventListener('click', addCard);
buttonChangeAvatar.addEventListener('click', changeAvatar);

// запустить валидацию
formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
formChangeAvatarValidator.enableValidation();
