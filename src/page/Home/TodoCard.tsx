import React from "react";
import { Button, Card } from "react-bootstrap";
import todoThumbnailExample from "@image/background.png";
import { TodoCardI } from "@/public/type/todo";

export default function TodoCardClass({card}: {card: TodoCardI}) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={card.img ?? todoThumbnailExample} />
      <Card.Body>
        <Card.Title>{card.title}</Card.Title>
        <Card.Text>{card.content}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
