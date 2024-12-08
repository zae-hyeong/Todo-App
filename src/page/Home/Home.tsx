import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import Header from "./Header";
import TodoCard from "./TodoCard";
import { TodoCardI } from "@/public/type/todo";
import CreateTodoModal from "./CreateTodoModal";
import { getTodosAPI } from "@/public/utils/todoAPI";

export default function Home() {
  const [cards, setCards] = useState<TodoCardI[]>([]);

  const [openCreateTodoModal, setOpenCreateTodoModal] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodosAPI();
      setCards(todos);
    };
    fetchTodos();
  }, []);

  const handleCreateTodoClick = {
    open: () => {
      setOpenCreateTodoModal(true);
    },

    close: () => {
      setOpenCreateTodoModal(false);
    },
  };

  function addNewTodo(todo: TodoCardI) {
    setCards((todos) => [...todos, todo]);
    handleCreateTodoClick.close();
  }

  function deleteTodo(todoId: string) {
    setCards((todos) => todos.filter((todo) => todo.id !== todoId));
  }

  function updateTodo(todo: TodoCardI) {
    setCards((todos) =>
      Array.from(
        todos.map((t) => {
          if (t.id === todo.id) return todo;
          return t;
        })
      )
    );
    //TODO: Close Update todo
  }

  return (
    <main id="home-root">
      <Header />
      <Button>목록</Button>
      <Button>상세 영역</Button>
      <h1>Your Todo List</h1>
      <div>
        <Stack gap={3} direction="horizontal">
          {cards?.map((card) => (
            <TodoCard
              card={card}
              key={card.id}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </Stack>
        <Button onClick={handleCreateTodoClick.open}>
          <Plus />
        </Button>
      </div>

      {openCreateTodoModal && (
        <CreateTodoModal
          onClose={handleCreateTodoClick.close}
          addToTodos={addNewTodo}
        />
      )}
    </main>
  );
}
