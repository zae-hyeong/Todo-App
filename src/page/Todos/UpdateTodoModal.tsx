import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import FormInput from "../Auth/FormInput";
import { updateTodoAPI } from "@/public/utils/todoAPI";
import ReactDOM from "react-dom";
import { TodoCardI } from "@/public/type/todo";
import { todos as todosAtom } from "@/public/state/states";
import { useRecoilState } from "recoil";

interface Props {
  todoId: string;
  setOpenUpdateTodoModal: (open: boolean) => void;
}

export default function UpdateTodoModal({
  todoId,
  setOpenUpdateTodoModal,
}: Props) {
  const [, setTodos] = useRecoilState<TodoCardI[]>(todosAtom);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    const updatedTodo = await updateTodoAPI(todoId, {
      title: fd.get("title") as string,
      content: fd.get("content") as string,
    });

    if (updatedTodo) {
      setTodos((todos) =>
        Array.from(
          todos.map((t) => {
            console.log("t.id ::", t.id, " / ", "todoId ::", todoId);
            if (t.id === todoId) return updatedTodo;
            return t;
          })
        )
      );
      setOpenUpdateTodoModal(false);
    }
  }

  return ReactDOM.createPortal(
    <dialog open>
      <button onClick={() => setOpenUpdateTodoModal(false)}>
        <X />
      </button>
      <h2>Update</h2>
      <h2>{todoId}</h2>
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
