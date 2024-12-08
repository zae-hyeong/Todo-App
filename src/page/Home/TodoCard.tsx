import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import todoThumbnailExample from "@image/background.png";
import { TodoCardI } from "@/public/type/todo";
import UpdateTodoModal from "./UpdateTodoModal";
import { X } from "react-bootstrap-icons";
import { deleteTodoAPI } from "@/public/utils/todoAPI";

export default function TodoCardClass({ card, deleteTodo }: { card: TodoCardI, deleteTodo: (todoId: string) => void }) {
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
    //TODO: 성공하면 이 카드 지워야 함.
    deleteTodo(card.id);
  }

  return (
    <>
      {openUpdateTodoModal && (
        <UpdateTodoModal todoId={card.id} onClose={handleUpdateTodoClick.close} />
      )}
      <Card style={{ width: "18rem" }}>
      <button onClick={handleDeleteCardClick}>
        <X />
      </button>
        <Card.Img variant="top" src={card.img ?? todoThumbnailExample} />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.content}</Card.Text>
          <Button variant="primary" onClick={handleUpdateTodoClick.open}>
            Go somewhere
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
