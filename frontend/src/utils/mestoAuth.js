export const BASE_URL = 'https://api.meste4ko.nomoredomains.work';

const request = (url, options) => {
  return fetch(`${BASE_URL}/${url}`, {
    ...options,
    credentials: 'include',
  }).then(getResponse);
};

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export const register = ({ email, password }) => {
  return request('signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};

export const login = ({ email, password }) => {
  return request('signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkTokenValidity = () => {
  return request('users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const signout = () => {
  return request('signout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
