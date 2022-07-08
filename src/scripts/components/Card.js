export default class Card {
    constructor( data , cardSelector, action) {
        this._data = data;
        this._elementName = data.name;
        this._elementLink = data.link;
        this._elementLikes = data.likes;
        this._elementLikeCounter = this._elementLikes.length;
        this._elementId = data._id;
        this._userId = data.currentUserId;
        this._ownerId = data.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = action.handleCardClick;
        this._handleDeleteButtonClick = action.handleDeleteButtonClick;
        this._handleLikeButtonClick = action.handleLikeButtonClick;
    }

    generateCard() {

        this._element = this._getTemplate();
        this._getElementKeys();
        this._showDeleteButton();
        this._setEventListeners();
        this._setCardValues();

        return this._element;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    _getElementKeys() {
        this._image = this._element.querySelector('.element__image');
        this._name = this._element.querySelector('.element__name');
        this._likeButton = this._element.querySelector('.element__like');
        this._likeCounter = this._element.querySelector('.element__like-counter');
    }

    _showDeleteButton() {
        // если карточка своя, сделать кнопку Delete видимой
        if (this._ownerId === this._userId) {
            this._delete = this._element.querySelector('.element__delete');
            this._delete.classList.add('element__delete_visible');
        }
    }

    _setCardValues() {
        this._image.src = this._elementLink;
        this._image.alt = this._elementName;
        this._name.textContent = this._elementName;
        this._setLikes();
    }

    _setLikes() {
        this._likeCounter.textContent = this._elementLikeCounter;
        // если свой лайк уже стоит, установить кнопку Like нажатой
        this._elementLikes.forEach(element => {
            if (element._id === this._userId) {
                this._likeButton.classList.add('element__like_active');
            }
        });
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeButtonClick(this, this._likeButton);
        });

        if (this._delete) {
            this._delete.addEventListener('click', () => {
                this._handleDeleteButtonClick(this)
            });
        }

        this._image.addEventListener('click', () => {
            this._handleCardClick(this._elementName, this._elementLink);
        });
    }

    // обновить количество лайков и состояние кнопки Like после нажатия
    updateLikes(data) {
        this._likeCounter.textContent = data.likes.length;
        this._likeButton.classList.toggle('element__like_active');
    }

    removeCard() {
       this._element.remove();
       this._element = null;
    }

    getId() {
        return this._elementId;
    }
}
