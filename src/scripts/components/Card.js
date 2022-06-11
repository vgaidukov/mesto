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
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._elementLink;
        this._element.querySelector('.element__image').alt = this._elementName;
        this._element.querySelector('.element__name').textContent = this._elementName;

        return this._element;
    }

    _handleLikeButtonClick() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _handleDeleteButtonClick() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeButtonClick();
        });

        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._handleDeleteButtonClick();
        });

        this._element.querySelector('.element__image').addEventListener('click', (evt) => {
            this._handleCardClick(evt.target);
        });
    }
}
