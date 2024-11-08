import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import Header from "./Header";
import TodoCard from "./TodoCard";
import TodoCardClass, { TodoCardI } from "@/public/utils/CardClass";

export default function Home() {
  const [cards, setCards] = useState<TodoCardI[]>();

  useEffect(() => {
    const tempCards: TodoCardI[] = [];
    for (let i = 0; i < 5; i++) {
      const c = new TodoCardClass({
        title: "asdf",
        content: "asdf",
        createdAt: new Date(),
        updatedAt: new Date(),
        id: "asdgf",
        img: null,
      });
      tempCards.push(c);
    }
    setCards(tempCards);
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