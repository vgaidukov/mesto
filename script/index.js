const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');

function openPopup() {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event){
    if (event.key === ESC_KEY) {
        closePopup();
    }
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

const ESC_KEY = 'Escape';

