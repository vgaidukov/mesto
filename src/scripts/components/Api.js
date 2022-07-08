export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialUserInfo() {
        return fetch(`${this._baseUrl}//users/me`, {
            method: 'GET',
            headers: this._headers
            })
            .then(res => this._checkServerResponse(res));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                headers: this._headers
            })
            .then(res => this._checkServerResponse(res));
    }

    patchUserInfo(data) {
        return fetch(`${this._baseUrl}//users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data['profile-name'],
                about: data['profile-description']
            })
        })
            .then(res => this._checkServerResponse(res));
    }

    postNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data['card-name'],
                link: data['img-link']
            })
        })
        .then(res => this._checkServerResponse(res));
    }

    deleteCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => this._checkServerResponse(res));
    }

    putLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(res => this._checkServerResponse(res));
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => this._checkServerResponse(res));
    }

    patchNewAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data['img-link']
            })
        })
        .then(res => this._checkServerResponse(res));
    }

    _checkServerResponse(result) {
        if (result.ok) {
            return result.json();
          }
          return Promise.reject(`Ошибка: ${result.status}`);
    }
}
