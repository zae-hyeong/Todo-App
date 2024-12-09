import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import FormInput from "../Auth/FormInput";
import { updateTodoAPI } from "@/public/utils/todoAPI";
import ReactDOM from "react-dom";
import { TodoCardI } from "@/public/type/todo";

export default function UpdateTodoModal({
  todoId,
  onClose,
  updateTodo
}: {
  todoId: string;
  onClose: () => void;
  updateTodo: (todo: TodoCardI) => void;
}) {
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    const updatedTodo = await updateTodoAPI(todoId, {
      title: fd.get("title") as string,
      content: fd.get("content") as string,
    });

    if(updatedTodo) updateTodo(updatedTodo);
  }

  return ReactDOM.createPortal(
    <dialog open>
      <button onClick={onClose}>
        <X />
      </button>
      <h2>Update</h2>
      {/* <h3>{todoId}</h3> */}
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
