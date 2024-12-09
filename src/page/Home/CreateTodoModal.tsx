import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import FormInput from "../Auth/FormInput";
import { createTodoAPI } from "@/public/utils/todoAPI";
import ReactDOM from "react-dom";
import { TodoCardI } from "@/public/type/todo";

export default function CreateTodoModal({
  onClose,
  addToTodos,
}: {
  onClose: () => void;
  addToTodos: (todo: TodoCardI) => void;
}) {
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    const newTodo = await createTodoAPI({
      title: fd.get("title") as string,
      content: fd.get("content") as string,
    });

    if (newTodo) addToTodos(newTodo);
  }

  return ReactDOM.createPortal(
    <dialog open>
      <button onClick={onClose}>
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
