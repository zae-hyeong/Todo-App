import { Button, Card } from "react-bootstrap";
import todoThumbnailExample from "@image/background.png";
import { TodoCardI } from "@/public/type/todo";
import UpdateTodoModal from "./UpdateTodoModal";
import { X } from "react-bootstrap-icons";
import { deleteTodoAPI } from "@/public/utils/todoAPI";
import { Link } from "react-router-dom";
import { openUpdateTodoModal as updateTodoModalAtom } from "@/public/state/states";
import { useRecoilState } from "recoil";

interface Props {
  card: TodoCardI;
  className: string;
  deleteTodo: (todoId: string) => void;
  updateTodo: (todo: TodoCardI) => void;
}

export default function TodoCardClass({
  card,
  className,
  deleteTodo,
  updateTodo,
}: Props) {

  const [openUpdateTodoModal, setOpenUpdateTodoModal] =
    useRecoilState<boolean>(updateTodoModalAtom);

  const handleDeleteCardClick = () => {
    deleteTodoAPI(card.id);
    deleteTodo(card.id);
  };

  return (
    <>
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
          <Button variant="primary" onClick={() => setOpenUpdateTodoModal(true)}>
            update Todo
          </Button>
        </Card.Body>
      </Card>

      {openUpdateTodoModal && (
        <UpdateTodoModal
          todoId={card.id}
          updateTodo={updateTodo}
        />
      )}
    </>
  );
}
