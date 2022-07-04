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
            .then(res => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                  return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
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
            .then(res => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
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
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
              return
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    putLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    patchNewAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data['img-link']
            })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

}
