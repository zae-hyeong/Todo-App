import { atom } from "recoil";
import {TodoCardI} from '@/public/type/todo';

export const todos = atom<TodoCardI[]>({key: 'todos', default: []});
export const openCreateTodoModal = atom<boolean>({key: 'createTodoModal', default: false});
export const openUpdateTodoModal = atom<boolean>({key: 'updateTodoModal', default: false});