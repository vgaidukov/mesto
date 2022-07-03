export default class Card {
    constructor(data, cardSelector, action) {
        this._elementName = data.name;
        this._elementLink = data.link;
        this._elementLikes = data.likes;
        this._elementLikeCounter = this._elementLikes.length;
        this._elementId = data._id;
        this._ownerId = data.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = action.handleCardClick;
        this._handleDeleteButtonClick = action.handleDeleteButtonClick;
        this._handleLikeButtonClick = action.handleLikeButtonClick;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._image = this._element.querySelector('.element__image');
        this._name = this._element.querySelector('.element__name');
        this._like = this._element.querySelector('.element__like');
        this._likeCounter = this._element.querySelector('.element__like-counter');

        if (this._ownerId === '0024cae9c84948b8f6159beb') {
            this._delete = this._element.querySelector('.element__delete');
            this._delete.classList.add('element__delete_visible');
        }

        this._setEventListeners();

        this._image.src = this._elementLink;
        this._image.alt = this._elementName;
        this._name.textContent = this._elementName;
        this._likeCounter.textContent = this._elementLikeCounter;

        this._elementLikes.forEach(element => {
            //console.log(10, element)
            if (element._id === '0024cae9c84948b8f6159beb') {
                this._like.classList.add('element__like_active');
            }
        });
        return this._element;
    }

    //_handleLikeButtonClick() {
    //    this._like.classList.toggle('element__like_active');
   // }

    _setEventListeners() {
        this._like.addEventListener('click', () => {
            this._handleLikeButtonClick(this._like, this._elementId, this._likeCounter);
        });

        if (this._delete) {
            this._delete.addEventListener('click', () => {
                this._handleDeleteButtonClick(this._element, this._elementId);
            });
        }

        this._image.addEventListener('click', () => {
            this._handleCardClick(this._elementName, this._elementLink);
        });
    }
}
