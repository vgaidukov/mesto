// массив попапов
export const popupList = document.querySelectorAll('.popup');

// кнопки
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const buttonChangeAvatar = document.querySelector('.profile__change-avatar-button');

// селекторы
    // профайла
export const profileNameSelector = '.profile__name';
export const profileDescriptionSelector = '.profile__description';
export const profileAvatarSelector = '.profile__avatar';
    // секции с карточками
export const containerWithCardsSelector = '.elements';
    // попапов
export const popupProfileSelector = '.popup_type_profile';
export const popupAddCardSelector = '.popup_type_add-card';
export const popupImageSelector = '.popup_type_image';
export const popupCardDeleteConfirmationSelector = '.popup_type_card-delete-confirmation';
export const popupChangeAvatarSelector = '.popup_type_change-avatar';

// попапы
const popupProfile = document.querySelector(popupProfileSelector);
const popupAddCard = document.querySelector(popupAddCardSelector);
const popupChangeAvatar = document.querySelector(popupChangeAvatarSelector);

// элементы попапа редактирования профайла
export const popupName = document.querySelector('.popup__input_type_name');
export const popupDescription = document.querySelector('.popup__input_type_description');

    // добавления карточки
// export const cardName = popupAddCard.querySelector('.popup__input_type_card-name');
// export const imgLink = popupAddCard.querySelector('.popup__input_type_img-link');
    // изменения аватара

// формы
export const formProfile = popupProfile.querySelector('.popup__form');
export const formAddCard = popupAddCard.querySelector('.popup__form');
export const formChangeAvatar = popupChangeAvatar.querySelector('.popup__form');


