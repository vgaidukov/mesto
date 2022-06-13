export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._elementName = data.name;
        this._elementLink = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._delete = this._element.querySelector('.element__delete');

        this._setEventListeners();

        this._image.src = this._elementLink;
        this._image.alt = this._elementName;
        this._name.textContent = this._elementName;

        return this._element;
    }

    _handleLikeButtonClick() {
        this._like.classList.toggle('element__like_active');
    }

    _handleDeleteButtonClick() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._like.addEventListener('click', () => {
            this._handleLikeButtonClick();
        });

        this._delete.addEventListener('click', () => {
            this._handleDeleteButtonClick();
        });

        this._image.addEventListener('click', () => {
            this._handleCardClick(this._elementName, this._elementLink);
        });
    }
}
