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

const popupProfile = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupProfile.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');

const ESC_KEY = 'Escape';

const cardsContainer = document.querySelector('.elements');

function createCard(item) {
    const template = document.querySelector('#element-template');
    const card = template.content.querySelector('.element').cloneNode(true);

    card.querySelector('.element__image').src = item.link;
    card.querySelector('.element__image').alt = item.name;
    card.querySelector('.element__name').textContent = item.name;

    return card;
}

function openPopup() {
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
    popupProfile.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup() {
    popupProfile.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event) {
    if (event.key === ESC_KEY) {
        closePopup();
    }
}

function popupSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup();
}

const renderCard = initialCards.forEach((item) => {
    cardsContainer.append(createCard(item));
})

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupProfile.addEventListener('submit', popupSubmitHandler);
