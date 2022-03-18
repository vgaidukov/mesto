const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupName = document.querySelector('.popup__input_profile-name');
let popupDescription = document.querySelector('.popup__input_profile-description');

const ESC_KEY = 'Escape';

function openPopup() {
    console.log(profileName.textContent);
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
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

function popupSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupElement.addEventListener('submit', popupSubmitHandler); 