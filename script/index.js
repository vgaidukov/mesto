// переменные для создания и добавления карточек

const cardsContainer = document.querySelector('.elements');
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
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');

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

function createCard(item) {
  const template = document.querySelector('#element-template');
  const card = template.content.querySelector('.element').cloneNode(true);

  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.name;
  card.querySelector('.element__name').textContent = item.name;
  return card;
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

// подставить текущие имя и описание в поля input
// открыть попап popup_type_profile
// вызвать обработчик по событию submit

function editProfile() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
  popupProfile.addEventListener('submit', popupProfileSubmitHandler);
}

// открыть попап popup_type_add-card
// вызвать обработчик по событию submit

function addCard() {
  openPopup(popupAddCard);
  popupAddCard.addEventListener('submit', popupCardSubmitHandler);
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
    closePopup(popupImage);
  }
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


initialCards.forEach(renderCard);
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addCard);
closeButton.forEach((element) => element.addEventListener('click', clickOnCloseButton));
