import {settings} from "./constants.js";


class Api {
  constructor() {
    this._address = settings.baseUrl;
    this._headers = settings.headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  _request(endpoint, options) {
    return fetch(`${this._address}${endpoint}`, options).then(
      this._checkAnswer
    );
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    });
  }

  saveUserInfo({name, about}) {
    return this._request(`/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: name, about: about}),
    });
  }

  saveUserAvatar({avatar}) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({avatar: avatar}),
    });
  }

  getInitialCards() {
    return this._request(`/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    });
  }


  addNewCard(data) {
    return this._request(`/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    });
  }


  toggleLike(cardId, method) {
    return this._request(`/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    });
  }
}

const api = new Api({
  baseUrl: "https://api.darimon.nomoredomains.xyz",
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
});
export default api;
