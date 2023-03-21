import axios from "../../node_modules/axios/index.js";
import { Todo } from "../models/todo.js";

const URL = 'http://localhost:3000';

export async function addTodo(todo: Todo) {
    const response = await axios.post(URL + "/todos", todo);
    console.log(response);
}

export async function getTodos(): Promise<Todo[]> {
    const response = await axios.get(URL + "/todos");
    console.log(response.data);
    return response.data as Todo[];
}

export async function getTodo(id: string): Promise<Todo> {
    const response = await axios.get(URL + `/todos/${id}`);
    return response.data;
}

export async function updateTodo(id: string, todo: Todo) {
    console.log('updating todo ', id);
    await axios.put(URL + `/todos/${id}`, todo);
}