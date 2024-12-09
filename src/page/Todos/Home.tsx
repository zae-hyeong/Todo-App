import { useEffect } from "react";
import { Plus } from "react-bootstrap-icons";
import Header from "./Header";
import TodoCard from "./TodoCard";
import { TodoCardI } from "@/public/type/todo";
import CreateTodoModal from "./CreateTodoModal";
import { getTodosAPI } from "@/public/utils/todoAPI";
import { useRecoilState } from "recoil";
import {
  todos as todoAtom,
  openCreateTodoModal as createTodoModalAtom,
  openUpdateTodoModal as updateTodoModalAtom,
} from "@/public/state/states";

export default function Home() {
  const [todos, setTodos] = useRecoilState<TodoCardI[]>(todoAtom);

  const [openCreateTodoModal, setOpenCreateTodoModal] =
    useRecoilState<boolean>(createTodoModalAtom);

  const [, setOpenUpdateTodoModal] =
    useRecoilState<boolean>(updateTodoModalAtom);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodosAPI();
      setTodos(todos);
    };
    fetchTodos();
  }, [setTodos]);

  function addNewTodo(todo: TodoCardI) {
    setTodos((todos) => [...todos, todo]);
    setOpenCreateTodoModal(false);
  }

  function deleteTodo(todoId: string) {
    setTodos((todos) => todos.filter((todo) => todo.id !== todoId));
  }

  function updateTodo(todo: TodoCardI) {
    setTodos((todos) =>
      Array.from(
        todos.map((t) => {
          if (t.id === todo.id) return todo;
          return t;
        })
      )
    );
    setOpenUpdateTodoModal(false);
  }

  return (
    <main id="home-root">
      <Header />
      <h1>Your Todo List</h1>
      <div className="container ">
        <div className="row">
          {todos?.map((card) => (
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
          onClick={() => {
            setOpenCreateTodoModal(true);
          }}
        >
          <Plus />
        </button>
      </div>

      {openCreateTodoModal && <CreateTodoModal addToTodos={addNewTodo} />}
    </main>
  );
}
