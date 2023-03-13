import axios from 'axios';
import * as http from 'http';
import { parse, ParsedUrlQuery } from 'querystring';
import { serveStaticElement, staticElement } from './static';
import { initialPage, sendPageResponse, Todo } from './todo_list';

function getContent(req: http.IncomingMessage, callback: (data: ParsedUrlQuery | null) => void) {
    if (req.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const todo = parse(body);
            callback(todo);
        });
    } else {
        callback(null);
    }
}

const server = http.createServer((req, res) => {
    const date = new Date().toISOString();
    console.log(date);

    const method = req.method;

    if (req.method == "GET" && staticElement(req.url)) {
        serveStaticElement(req, res);
    }
    else if (req.method == "GET" && req.url == "/") {
        axios.get('http://localhost:3000/todos')
            .then(response => {
                sendPageResponse(initialPage(date, null, response.data), res);
            })
            .catch(error => {
                console.log('Error: ' + error);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h1>Could not get the todos</h1>');
                res.end();
            });
    }
    else if (req.method == "GET" && req.url == "/addTodo") {
        getContent(req, data => {
            if (data) {
                const todo = {
                    when: data.when as string,
                    what: data.what as string,
                    who: data.who as string,
                    done: false
                };
                console.log(todo);
                axios.post('http://localhost:3000/todos', todo)
                    .then(response => {
                        console.log(response.data);
                        res.writeHead(301, { 'Location': '/' });
                        res.end();
                    })
                    .catch(error => {
                        console.log('Error: ' + error);
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write('<h1>Could not create the todo</h1>');
                        res.end();
                    });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h1>Could not collect the data</h1>');
                res.end();
            }
        });
    }
    else if (req.method == "POST" && /\/todos\/markDone\/[0-9]+/i.test(req.url ?? "")) {
        const id = req.url?.split('/')[3];
        if (id != null) {
            axios.get('http://localhost:3000/todos/' + id)
                .then(response => {
                    console.dir(response.data);
                    const todo = response.data as Todo;
                    todo.done = true;
                    console.log(todo);
                    axios.put('http://localhost:3000/todos/' + id, todo)
                        .then(response => {
                            console.log(response.data);
                            res.writeHead(301, { 'Location': '/' });
                            res.end();
                        })
                        .catch(error => {
                            console.log('Error: ' + error);
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write('<h1>Could not update the todo</h1>');
                            res.end();
                        });
                })
                .catch(error => {
                    console.log('Error: ' + error);
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write('<h1>Could not get the todo</h1>');
                    res.end();
                });
        } else {
            console.log('could get id');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Could not get the id</h1>');
            res.end();
        }
    }
    else if (req.method == "GET" && /\/todos\/editTodo\/[0-9]+/i.test(req.url ?? "")) {
        const id = req.url?.split('/')[3];
        if (id) {
            axios.get('http://localhost:3000/todos/' + id)
                .then(response => {
                    const todo = response.data as Todo;
                    console.log(todo);
                    axios.get('http://localhost:3000/todos')
                        .then(response => {
                            const todos = response.data as Todo[];

                            sendPageResponse(initialPage(date, todo, todos), res);
                        })
                        .catch(error => {
                            console.log('Error: ' + error);
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write('<h1>Could not get the todos</h1>');
                            res.end();
                        });
                })
                .catch(error => {
                    console.log('Error: ' + error);
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write('<h1>Could not get the todo</h1>');
                    res.end();
                });
        } else {
            console.log('could get id');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Could not get the id</h1>');
            res.end();
        }
    }
    else if(req.method == "POST" && /\/todos\/editTodo\/[0-9]+/i.test(req.url ?? "")) {
        const id = req.url?.split('/')[3];
        if(id) {
        getContent(req, data => {
            console.log(data);
            axios.put('http://localhost:3000/todos/' + id, data)
                .then(response => {
                console.log(response.data);
                res.writeHead(301, { 'Location': '/' });
                res.end();
            })
            .catch(error => {
                console.log('Error: ' + error);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h1>Could not update the todo</h1>');
                res.end();
            });
        });
        } else {
            console.log('could get id');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Could not get the id</h1>');
            res.end();
        }
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Not Implemented</h1>');
        res.end();
    }
});

console.log('Server is running http://localhost:7777');
server.listen('7777');
