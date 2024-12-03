import { loginInfo, loginResponse } from "../type/auth";
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