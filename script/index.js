const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const saveButton = popupElement.querySelector('.popup__save-button')

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupName = document.querySelector('.popup__input_profile-name');
const popupDescription = document.querySelector('.popup__input_profile-description');

const ESC_KEY = 'Escape';

function openPopup() {
    popupName.setAttribute('value', profileName.textContent);
    popupDescription.setAttribute('value', profileDescription.textContent);
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp);
    console.log(profileName.textContent);
}
    
function closePopup() {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
    console.log(profileName.textContent);
}

function savePopup() {
    closePopup();
}

function onDocumentKeyUp(event){
    if (event.key === ESC_KEY) {
        closePopup();
    }
}

console.log();

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);



