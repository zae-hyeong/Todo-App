import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import FormInput from "../Auth/FormInput";
import { createTodoAPI } from "@/public/utils/todoAPI";
import ReactDOM from "react-dom";
import { TodoCardI } from "@/public/type/todo";
import { useRecoilState } from "recoil";
import {
  todos as todoAtom,
  openCreateTodoModal as createTodoModalAtom,
} from "@/public/state/states";

export default function CreateTodoModal() {
  const [, setOpenCreateTodoModal] =
    useRecoilState<boolean>(createTodoModalAtom);

  const [, setTodos] = useRecoilState<TodoCardI[]>(todoAtom);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    const newTodo = await createTodoAPI({
      title: fd.get("title") as string,
      content: fd.get("content") as string,
    });

    if (newTodo) {
      setTodos((todos) => [...todos, newTodo]);
      setOpenCreateTodoModal(false);
    }
  }

  return ReactDOM.createPortal(
    <dialog open>
      <button
        onClick={() => {
          setOpenCreateTodoModal(false);
        }}
      >
        <X />
      </button>
      <h2>Create</h2>
      <Form onSubmit={handleSubmit}>
        <FormInput
          id={0}
          name="title"
          type="text"
          placeholder={"title"}
          errorMessage={""}
          label={""}
          pattern={""}
          required={false}
        />
        <FormInput
          id={0}
          name="content"
          type="text"
          placeholder={"content"}
          errorMessage={""}
          label={""}
          pattern={""}
          required={false}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </dialog>,
    document.getElementById("home-root") as HTMLElement
  );
}
