import { createTodoRequestBody, TodoCardI } from "../type/todo";
import { getToken } from "./localStorage";

const API_URL = "http://localhost:8080";

export async function getTodosAPI() {
  const token = getToken();

  if (!token) {
    console.error("Fail to get token");
    return [];
  }

  try {
    const response = await fetch(API_URL + "/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) throw new Error("api request fail");

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
}

export async function createTodoAPI({ title, content }: createTodoRequestBody) {
  const token = getToken();

  if (!token) {
    console.error("Fail to get token");
    return null;
  }

  try {
  const response = await fetch(API_URL + "/todos", {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) throw new Error("api request fail");

  const data = await response.json();
  return data.data as TodoCardI;

  } catch(error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}
