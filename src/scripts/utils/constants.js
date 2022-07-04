export const cardsContainer = '.elements';

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const buttonChangeAvatar = document.querySelector('.profile__change-avatar-button');

export const profileNameSelector = '.profile__name';
export const profileDescriptionSelector = '.profile__description';
export const profileAvatarSelector = '.profile__avatar';

// переменные попапов
export const popupImageSelector = '.popup_type_image';
export const popupList = document.querySelectorAll('.popup');

export const popupProfileSelector = '.popup_type_profile';
export const popupProfile = document.querySelector(popupProfileSelector);
export const popupName = document.querySelector('.popup__input_type_name');
export const popupDescription = document.querySelector('.popup__input_type_description');

export const popupAddCardSelector = '.popup_type_add-card';
export const popupAddCard = document.querySelector(popupAddCardSelector);
export const cardName = popupAddCard.querySelector('.popup__input_type_card-name');
export const imgLink = popupAddCard.querySelector('.popup__input_type_img-link');

export const popupChangeAvatarSelector = '.popup_type_change-avatar';
export const popupChangeAvatar = document.querySelector(popupChangeAvatarSelector);

export const formProfile = popupProfile.querySelector('.popup__form');
export const formAddCard = popupAddCard.querySelector('.popup__form');
export const formChangeAvatar = popupChangeAvatar.querySelector('.popup__form');

export const popupCardDeleteConfirmationSelector = '.popup_type_card-delete-confirmation';

