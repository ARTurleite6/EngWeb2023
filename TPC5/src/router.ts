import express from 'express';
import { initialPage, setEditTodo } from './controllers/base_controller.js';
import { addTodo, getTodo, getTodos, updateTodo } from './controllers/todo_controller.js';
import { Todo } from './models/todo.js';

export const base_router = express.Router();
export const static_router = express.Router();

static_router.get(/\/w3.css$/i, (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/css');
    res.sendFile('w3.css', { root: './public' });
});

static_router.get(/\/favicon.png$/i, (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'image/png');
    res.sendFile('favicon.png', { root: './public' });
});

base_router.get('/', async (req, res) => {
    const date = new Date().toISOString().substring(0, 7);
    console.log(date);
    console.log(req.method, req.url);
    res.setHeader('Content-Type', 'text/html');
    try {
        const todos = await getTodos();
        res.status(200);
        res.send(initialPage(date, todos));
    } catch (error) {
        console.log(error);
    }
});

export const todo_router = express.Router();

todo_router.post('/addTodo', async (req, res) => {
    try {
        const body = req.body;

        const todo = body as Todo;
        todo.done = false;
        await addTodo(todo);
    } catch (error) {
        console.log(error);
    }
    res.redirect('/');
});

todo_router.post('/markDone/:id', async (req, res) => {
    console.log('hello');
    try {
        const id = req.params.id;
        const todo = await getTodo(id);
        console.log(todo);
        todo.done = true;
        await updateTodo(id, todo);
        res.redirect('/');
    }
    catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'text/html');
        res.send('<p>Couldn\'t get the todo with this id</p>');
    }
});

todo_router.get('/editTodo/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const todo = await getTodo(id);
        setEditTodo(todo);

        res.redirect('/');
    } catch(error) {
        console.log(error);
        res.setHeader('Content-Type', 'text/html');
        res.send('<p>Couldn\'t ask to edit the todo with this id</p>');
    }
});

todo_router.post('/editTodo/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const todo = await getTodo(id);
        setEditTodo(null);
        res.redirect('/');
    } catch(error) {
        console.log(error);
        res.setHeader('Content-Type', 'text/html');
        res.send('<p>Couldn\'t ask to edit the todo with this id</p>');
    }
});