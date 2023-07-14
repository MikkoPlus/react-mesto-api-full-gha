class Api {
  constructor(config) {
    this._baseUrl = config.baseUrlAdress;
    this._headers = config.headers;
    this._profileUrl = `${this._baseUrl}/users/me`;
    this._profileAvatarUrl = `${this._profileUrl}/avatar`;
    this._cardsUrl = `${this._baseUrl}/cards`;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, {
      ...options,
      credentials: 'include',
    }).then(this._getResponse);
  }

  _fetchGetRequest(url) {
    return this._request(url, {
      method: 'GET',
      headers: this._headers,
    });
  }

  _fetchPostRequest(url, method, bodyData) {
    return this._request(url, {
      method: method,
      headers: this._headers,
      body: bodyData,
    });
  }

  _fetchDeleteRequest(url, id) {
    return this._request(`${url}/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  _fetchChangeLikesState(url, id, method) {
    return this._request(`${url}/${id}/likes`, {
      method: method,
      headers: this._headers,
    });
  }

  _transformDataToJSON(inputValues) {
    return JSON.stringify(inputValues);
  }

  getProfileData() {
    return this._fetchGetRequest(this._profileUrl);
  }

  getCards() {
    return this._fetchGetRequest(this._cardsUrl);
  }

  postNewCard(requestObj) {
    const bodyData = this._transformDataToJSON(requestObj);
    return this._fetchPostRequest(this._cardsUrl, 'POST', bodyData);
  }

  postProfileData(inputValues) {
    const bodyData = this._transformDataToJSON(inputValues);
    return this._fetchPostRequest(this._profileUrl, 'PATCH', bodyData);
  }

  setUserInfo(requestObj) {
    const bodyData = this._transformDataToJSON(requestObj);
    return this._fetchPostRequest(this._profileUrl, 'PATCH', bodyData);
  }

  postAvatar(requestObj) {
    const bodyData = this._transformDataToJSON(requestObj);
    return this._fetchPostRequest(this._profileAvatarUrl, 'PATCH', bodyData);
  }

  toggleLikeStatus(cardId, isLiked) {
    if (!isLiked) {
      return this._fetchChangeLikesState(this._cardsUrl, cardId, 'PUT');
    } else {
      return this._fetchChangeLikesState(this._cardsUrl, cardId, 'DELETE');
    }
  }

  deleteCard(cardId) {
    return this._fetchDeleteRequest(this._cardsUrl, cardId);
  }
}

const api = new Api({
  baseUrlAdress: 'http://api.meste4ko.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default api;
