import axios from 'axios';

const LOGIN_API_URL = 'http://localhost:8080/api/login';
const REGISTER_API_URL = 'http://localhost:8080/api/register';

export const login = async (id, pw) => {
  let info = { username: id, password: pw };
  let token = (await axios.post(LOGIN_API_URL, info)).data;
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  return token;
};

export const register = async (id, pw, bdate) => {
  let info = {
    username: id,
    password: pw,
    birth_date: bdate
  };
  await axios.post(REGISTER_API_URL, info);
};
