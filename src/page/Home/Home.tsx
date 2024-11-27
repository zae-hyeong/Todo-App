import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import Header from "./Header";
import TodoCard from "./TodoCard";
import { TodoCardI } from "@/public/type/todo";
import { getTodosAPI } from "@/public/utils/api";

export default function Home() {
  const [cards, setCards] = useState<TodoCardI[]>();

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodosAPI();
      setCards(todos);
    };
    fetchTodos();
  }, []);

  return (
    <main>
      <Header />
      <Button>목록</Button>
      <Button>상세 영역</Button>
      <h1>Your Todo List</h1>
      <div>
        <Stack gap={3} direction="horizontal">
          {cards?.map((card) => (
            <TodoCard card={card}></TodoCard>
          ))}
        </Stack>
        <Button>
          <Plus />
        </Button>
      </div>
    </main>
  );
}
