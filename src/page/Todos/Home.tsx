import { useEffect, useState } from "react";
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
  
  function addNewTodo(todo: TodoCardI) {
    setCards((todos) => [...todos, todo]);
    setOpenCreateTodoModal(false);
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
      <h1>Your Todo List</h1>
      <div className="container ">
        <div className="row">
          {cards?.map((card) => (
            <TodoCard
              card={card}
              key={card.id}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
              className={"col-4"}
            />
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {setOpenCreateTodoModal(true)}}
        >
          <Plus />
        </button>
      </div>

      {openCreateTodoModal && (
        <CreateTodoModal
          onClose={() => {setOpenCreateTodoModal(false)}}
          addToTodos={addNewTodo}
        />
      )}
    </main>
  );
}
