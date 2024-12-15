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
  openCreateTodoModal as createTodoModalAtom
} from "@/public/state/states";

export default function Home() {
  const [todos, setTodos] = useRecoilState<TodoCardI[]>(todoAtom);

  const [openCreateTodoModal, setOpenCreateTodoModal] =
    useRecoilState<boolean>(createTodoModalAtom);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodosAPI();
      setTodos(todos);
    };
    fetchTodos();
  }, [setTodos]);

  return (
    <main id="home-root">
      <Header />
      <h1>Your Todo List</h1>
      <div className="container ">
        <div className="row">
          {todos?.map((todo) => (
            <TodoCard
              todo={todo}
              key={todo.id}
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

      {openCreateTodoModal && <CreateTodoModal />}
    </main>
  );
}
