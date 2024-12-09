import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import todoThumbnailExample from "@image/background.png";
import { TodoCardI } from "@/public/type/todo";
import UpdateTodoModal from "./UpdateTodoModal";
import { X } from "react-bootstrap-icons";
import { deleteTodoAPI } from "@/public/utils/todoAPI";
import { Link } from "react-router-dom";

export default function TodoCardClass({
  card,
  className,
  deleteTodo,
  updateTodo,
}: {
  card: TodoCardI;
  className: string;
  deleteTodo: (todoId: string) => void;
  updateTodo: (todo: TodoCardI) => void;
}) {
  const [openUpdateTodoModal, setOpenUpdateTodoModal] =
    useState<boolean>(false);

  const handleUpdateTodoClick = {
    open: () => {
      setOpenUpdateTodoModal(true);
    },

    close: () => {
      setOpenUpdateTodoModal(false);
    },
  };

  const handleDeleteCardClick = () => {
    deleteTodoAPI(card.id);
    deleteTodo(card.id);
  };

  return (
    <>
      {openUpdateTodoModal && (
        <UpdateTodoModal
          todoId={card.id}
          onClose={handleUpdateTodoClick.close}
          updateTodo={updateTodo}
        />
      )}

      <Card style={{ width: "18rem" }}>
        <button onClick={handleDeleteCardClick}>
          <X />
        </button>
        <Link to={`/todos/${card.id}`} className={className}>
          <Card.Img variant="top" src={card.img ?? todoThumbnailExample} />
        </Link>
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.content}</Card.Text>
            <Button variant="primary" onClick={handleUpdateTodoClick.open}>
              update Todo
            </Button>
          </Card.Body>
      </Card>
    </>
  );
}
