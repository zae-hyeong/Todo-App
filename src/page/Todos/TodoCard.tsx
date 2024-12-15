import { Button, Card } from "react-bootstrap";
import todoThumbnailExample from "@image/background.png";
import { TodoCardI } from "@/public/type/todo";
import UpdateTodoModal from "./UpdateTodoModal";
import { X } from "react-bootstrap-icons";
import { deleteTodoAPI } from "@/public/utils/todoAPI";
import { Link } from "react-router-dom";
import { todos as todoAtom } from "@/public/state/states";
import { useRecoilState } from "recoil";
import { useState } from "react";

export default function TodoCardClass({ todo }: { todo: TodoCardI }) {
  const [openUpdateTodoModal, setOpenUpdateTodoModal] =
    useState<boolean>(false);

  const [, setTodos] = useRecoilState<TodoCardI[]>(todoAtom);

  function deleteTodo(todoId: string) {
    setTodos((todos) => todos.filter((todo) => todo.id !== todoId));
  }

  return (
    <>
      <Card className="col-3">
        <button
          onClick={() => {
            deleteTodoAPI(todo.id);
            deleteTodo(todo.id);
          }}
        >
          <X />
        </button>
        <Link to={`/todos/${todo.id}`}>
          <Card.Img variant="top" src={todo.img ?? todoThumbnailExample} />
        </Link>
        <Card.Body>
          <Card.Title>{todo.title}</Card.Title>
          <Card.Text>{todo.content}</Card.Text>
          <Button
            variant="primary"
            onClick={() => setOpenUpdateTodoModal(true)}
          >
            update Todo
          </Button>
        </Card.Body>
      </Card>

      {openUpdateTodoModal && (
        <UpdateTodoModal
          todoId={todo.id}
          setOpenUpdateTodoModal={setOpenUpdateTodoModal}
        />
      )}
    </>
  );
}
