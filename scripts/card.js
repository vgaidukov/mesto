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

        this._cardImage = this._element.querySelector('.element__image');
        this._cardName = this._element.querySelector('.element__name');
        this._cardLike = this._element.querySelector('.element__like');
        this._cardDelete = this._element.querySelector('.element__delete');

        this._setEventListeners();

        this._cardImage.src = this._elementLink;
        this._cardImage.alt = this._elementName;
        this._cardName.textContent = this._elementName;

        return this._element;
    }

    _handleLikeButtonClick() {
        this._cardLike.classList.toggle('element__like_active');
    }

    _handleDeleteButtonClick() {
        this._element.remove();
    }

    _setEventListeners() {
        this._cardLike.addEventListener('click', () => {
            this._handleLikeButtonClick();
        });

        this._cardDelete.addEventListener('click', () => {
            this._handleDeleteButtonClick();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._cardImage);
        });
    }
}
