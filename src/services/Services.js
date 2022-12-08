import axios from 'axios';

export const WS_URL = 'ws://inchat.webhop.me:3014/';
const REGISTER_API_URL = '';
export const api = axios.create({
  baseURL: 'http://inchat.webhop.me:3013/'
});

export const login = async (id, pw) => {
  let info = { email: id, password: pw };
  const LOGIN_API_URL = 'user/login';

  let response = await api.post(LOGIN_API_URL, info, {
    validateStatus: false
  });
  return response;
};

export const register = async (id, sr, username, email, pw) => {
  let info = {
    name: id,
    surname: sr,
    username: username,
    email: email,
    password: pw
  };
  let response = await api.post(REGISTER_API_URL, info, {
    validateStatus: false
  });

  return response;
};
