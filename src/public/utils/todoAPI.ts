import { Todo, TodoCardI } from "../type/todo";
import { getToken, saveToken } from "./localStorage";

const API_URL = "http://localhost:8080";

export async function getTodosAPI() {
  const token = getToken();

  if (!token) {
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

    if(!response.ok) throw new Error('api request fail');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return [];
  }
}

export async function createTodoAPI({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const token = getToken();

  if (!token) {
    // return new Array<TodoCardI>();
    //TODO: 토큰이 없는 경우에 생기는 에러
  }

  const reqestBody = {
    title: title,
    content: content,
  };

  const response = await fetch(API_URL + "/todos", {
    method: "POST",
    body: JSON.stringify(reqestBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
  });

  response
    .json()
    .then((data) => {
      return data.data as Todo;
    })
    .catch((error) => {
      alert(error);
    });
  return new Array<Todo>();
}
