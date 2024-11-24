import { saveToken } from "./localStorage";

const API_URL = 'http://localhost:8080'

type loginInfo = {
  email: string,
  password: string
}

type loginResponse = {
  message: string,
  token: string
}

export async function createUserAPI(signinData: loginInfo) {
  const response = await fetch(API_URL + '/users/create', {
    method: "POST",
    body: JSON.stringify(signinData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // saveToken(response.json().token);
  // localStorage.setItem('token', response.json().token);

  return response.json();
}

export async function loginAPI(signinData: loginInfo) {
  const response = await fetch(API_URL + '/users/create', {
    method: "",
    body: JSON.stringify(signinData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}