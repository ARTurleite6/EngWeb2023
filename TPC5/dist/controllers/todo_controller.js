import axios from "../../node_modules/axios/index.js";
const URL = 'http://localhost:3000';
export async function addTodo(todo) {
    const response = await axios.post(URL + "/todos", todo);
    console.log(response);
}
export async function getTodos() {
    const response = await axios.get(URL + "/todos");
    console.log(response.data);
    return response.data;
}
export async function getTodo(id) {
    const response = await axios.get(URL + `/todos/${id}`);
    return response.data;
}
export async function updateTodo(id, todo) {
    console.log('updating todo ', id);
    await axios.put(URL + `/todos/${id}`, todo);
}
