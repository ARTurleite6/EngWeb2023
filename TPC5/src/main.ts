import express from 'express';
import { base_router, static_router, todo_router } from './router.js';
import bodyParser from 'body-parser';

const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', base_router);
app.use('/', static_router);
app.use('/todos', todo_router);

app.listen(7777, () => {
    console.log("Server running on http://localhost:7777");
});