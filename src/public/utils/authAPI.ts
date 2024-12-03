import { loginInfo, loginResponse } from "../type/auth";
import { removeToken, saveToken } from "./localStorage";

const API_URL = "http://localhost:8080";

export async function createUserAPI(signinData: loginInfo) {
  try {
    const response = await fetch(API_URL + "/users/create", {
      method: "POST",
      body: JSON.stringify(signinData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("api request fail");

    const data = await response.json() as loginResponse;

    alert(data.message + " 로그인 창으로 이동합니다");

    return data.token;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return "";
  }
}

export async function loginAPI(loginData: loginInfo) {
  try {
    const response = await fetch(API_URL + "/users/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("api request fail");

    const data = await response.json() as loginResponse;

    saveToken(data.token);
    
    return data.token;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return "";
  }
}

export async function logout() {
  removeToken("loginToken");
}
