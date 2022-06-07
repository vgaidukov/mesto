import initialCards from './cards.js';
import Card from './components/Card.js';

import { validationObject } from './validationObject.js';
import FormValidator from './components/FormValidator.js';

import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';


// переменные для создания и добавления карточек

//const template = document.querySelector('#element-template');

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
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//const popupImage = popupImageContainer.querySelector('.popup__image');
//const popupLabel = popupImageContainer.querySelector('.popup__label');

// переменные кнопок

//const closeButtonList = document.querySelectorAll('.popup__close-button');
//const ESC_KEY = 'Escape';

/*
//добавить карточку в DOM

function renderCard(item) {
    cardsContainer.prepend(createCard(item));
}

// создать карточку
// навесить случатели на кнопки like, delete, просмотр карточки; выполнить действие

function createCard(item) {
    const card = template.content.querySelector('.element').cloneNode(true);
    const cardImage = card.querySelector('.element__image');
    const cardName = card.querySelector('.element__name');
    const deleteButton = card.querySelector('.element__delete');
    const likeButton = card.querySelector('.element__like');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardName.textContent = item.name;

    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like_active');
    });

    deleteButton.addEventListener('click', () => {
        card.remove();
    });
    cardImage.addEventListener('click', () => {renderPopupImageContainer(cardImage)});

    return card;
}


initialCards.forEach(renderCard);
*/

// открыть попап

/*function openPopup(form) {
    form.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp);
}

// закрыть попап

function closePopup(form) {
    form.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
}

// проверить нажатие Ecs,
// передать попап с классом popup_opened в качестеве аргумента функции closePopup

function onDocumentKeyUp(event) {
    if (event.key === ESC_KEY) {
        const openedPopup = document.querySelector('.popup_opened');

        closePopup(openedPopup);
    }
}

// проверить нажатие на оверлей или крестик
// вызвать закрытие попапа


function clickToClose(event) {
    const target = event.target;
    const currentPopup = target.closest('.popup');

    if ((target.classList.contains('popup')) || (target.classList.contains('popup__close-button'))) {
        closePopup(currentPopup);
    }

}
*/

// подставить текущие имя и описание в поля input
// открыть попап popup_type_profile

function editProfile() {
    const formElement = popupProfile.querySelector('.popup__form');

    const formValidator = new FormValidator(validationObject, formElement);
    formValidator.enableValidation();
    formValidator.clearInputErrors(formElement);

    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;

    //openPopup(popupProfile);

    const popupWithForm = new PopupWithForm(popupProfile, (evt) => {
        evt.preventDefault();
        profileName.textContent = popupName.value;
        profileDescription.textContent = popupDescription.value;
        popupWithForm.close();
    });

    popupWithForm.setEventListeners();
    popupWithForm.open();

}

// открыть попап popup_type_add-card
// установить неактивное состояние кнопки

function addCard() {
    const formElement = popupAddCard.querySelector('.popup__form');

    //cardName.value = '';
    //imgLink.value = '';

    const formValidator = new FormValidator(validationObject, formElement);
    formValidator.enableValidation();
    formValidator.clearInputErrors(formElement);
    formValidator.setButtonInactive(formElement);

    const popupWithForm = new PopupWithForm(popupAddCard, (evt) => {
            evt.preventDefault();
            const newCard = {
                name: cardName.value,
                link: imgLink.value
            };
            const card = new Card(newCard, '#element-template', handleCardClick);
            cardsContainer.prepend(card.generateCard());

            popupWithForm.close();
            //cardName.value = '';
            //imgLink.value = '';
        });

    popupWithForm.setEventListeners();
    popupWithForm.open();

    //openPopup(popupAddCard);
}

// обработчик submit редактирования профиля popupProfile

//function popupProfileSubmitHandler (evt) {
//    profileName.textContent = popupName.value;
//    profileDescription.textContent = popupDescription.value;
//    closePopup(popupProfile);
//}

// создать попап с картинкой

function handleCardClick(image) {
    //popupImage.src = image.src;
    //popupImage.alt = image.alt;
    //popupLabel.textContent = image.alt;

    const popupWithImage = new PopupWithImage(popupImageContainer);
    popupWithImage.setEventListeners();
    popupWithImage.open({
        src: image.src,
        alt: image.alt,
        textContent: image.alt
    });

    //openPopup(popupImageContainer);
}

// обработчик submit добавления карточки popupAddCard

/*
function popupCardSubmitHandler (evt) {
    const newCard = {
                      name: cardName.value,
                      link: imgLink.value
                    };
    const card = new Card(newCard, '#element-template', renderPopupImageContainer);
    cardsContainer.prepend(card.generateCard());

    closePopup(popupAddCard);
    cardName.value = '';
    imgLink.value = '';
}*/

// установить значение display: flex для попапов

function popupSetFlex () {
    popupList.forEach((el) => el.classList.add('popup_flex'));
}

popupSetFlex();



const cardsContainer = document.querySelector('.elements');

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#element-template', handleCardClick);
        cardsContainer.prepend(card.generateCard());
    }
});
cardsList.renderItem();


/*initialCards.forEach((item) => {
    const card = new Card(item, '#element-template', renderPopupImageContainer);
    cardsContainer.prepend(card.generateCard());
}); */

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

//enableValidation(validationObject);

editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addCard);
//closeButtonList.forEach((element) => element.addEventListener('click', clickToClose));
//popupList.forEach((element) => element.addEventListener('mousedown', clickToClose));
//formProfile.addEventListener('submit', popupProfileSubmitHandler);
//formAddCard.addEventListener('submit', popupCardSubmitHandler);
