// переменные для создания и добавления карточек

const cardsContainer = document.querySelector('.elements');
//import {initialCards} from '../scripts/cards';
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// переменные попапов

const popup = document.querySelectorAll('.popup');

const popupAddCard = document.querySelector('.popup_type_add-card');
const cardName = popupAddCard.querySelector('.popup__input_type_card-name');
const imgLink = popupAddCard.querySelector('.popup__input_type_img-link');


const popupProfile = document.querySelector('.popup_type_profile');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupImageContainer = document.querySelector('.popup_type_image');

// переменные кнопок

const closeButton = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const ESC_KEY = 'Escape';

//добавить карточку в DOM

function renderCard(item) {
    cardsContainer.prepend(createCard(item));
}

// создать карточку
// навесить случатели на кнопки like, delete, просмотр карточки; выполнить действие

function createCard(item) {
    const template = document.querySelector('#element-template');
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

    cardImage.addEventListener('click', renderPopupImageContainer);

    return card;
}

// создать попап с картинкой

function renderPopupImageContainer (event) {
    const target = event.target;
    const popupImage = popupImageContainer.querySelector('.popup__image');
    const popupLabel = popupImageContainer.querySelector('.popup__label');

    popupImage.src = target.src;
    popupImage.alt = target.alt;
    popupLabel.textContent = target.alt;
    openPopup(popupImageContainer);
}

// открыть попап

function openPopup(form) {
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
        popup.forEach((element) => {
            if (element.classList.contains('popup_opened')) {
                closePopup(element);
            }
        })
    }
}

// передать попап, на кнопку закрытия которого было нажатие,
// в качестеве аргумента функции closePopup

function clickOnCloseButton(event) {
    const target = event.target;

    if (target.classList.contains('popup__close-button_type_profile')) {
        closePopup(popupProfile);
    }
    if (target.classList.contains('popup__close-button_type_card')) {
       closePopup(popupAddCard);
    }
    if (target.classList.contains('popup__close-button_type_image')) {
       closePopup(popupImageContainer);
    }
}

// подставить текущие имя и описание в поля input
// открыть попап popup_type_profile
// вызвать обработчик по событию submit

function editProfile() {
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
    openPopup(popupProfile);
}

// открыть попап popup_type_add-card
// вызвать обработчик по событию submit

function addCard() {
    openPopup(popupAddCard);
}

// обработчик submit редактирования профиля popupProfile

function popupProfileSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup(popupProfile);
}

// обработчик submit добавления карточки popupAddCard

function popupCardSubmitHandler (evt) {
    evt.preventDefault();
    const newCard = {
                      name: cardName.value,
                      link: imgLink.value
                    };
    renderCard(newCard);
    closePopup(popupAddCard);
    cardName.value = '';
    imgLink.value = '';
}

// установить значение display: flex для попапов

function popupSetFlex () {
   popup.forEach((el) => el.style.display = 'flex');
}

popupSetFlex();
initialCards.forEach(renderCard);
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addCard);
closeButton.forEach((element) => element.addEventListener('click', clickOnCloseButton));
popupProfile.addEventListener('submit', popupProfileSubmitHandler);
popupAddCard.addEventListener('submit', popupCardSubmitHandler);
