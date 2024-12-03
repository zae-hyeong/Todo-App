import todoThumbnailExample from "@image/background.png";

export interface createTodoRequestBody {
  title: string;
  content: string;
}

export interface TodoCardI {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  img: string | null;
}

export default class TodoCard implements TodoCardI {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  img: string | null;

  constructor({ title, content, id, createdAt, updatedAt, img }: TodoCardI) {
    this.title = title;
    this.content = content;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.img = img ?? todoThumbnailExample;
  }
}
