import { loginInfo, loginResponse } from "../type/auth";
import { TodoCardI } from "../type/todo";
import { getToken, saveToken } from "./localStorage";

const API_URL = "http://localhost:8080";

export async function createUserAPI(signinData: loginInfo) {
  const response = await fetch(API_URL + "/users/create", {
    method: "POST",
    body: JSON.stringify(signinData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  response
    .json()
    .then(() => {})
    .catch((error) => alert(error));

  return response.status;
}

export async function loginAPI(loginData: loginInfo) {
  const response = await fetch(API_URL + "/users/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  response
    .json()
    .then((data: loginResponse) => {
      saveToken(data.token);
    })
    .catch((error) => alert(error));

  return response.status;
}

export async function getTodosAPI() {
  const token = getToken();

  if (!token) {
    return new Array<TodoCardI>();
  }

  const response = await fetch(API_URL + "/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  });

  response
    .json()
    .then((data) => {
      return data.data as TodoCardI[];
    })
    .catch((error) => {
      alert(error);
    });
  return new Array<TodoCardI>();
}
