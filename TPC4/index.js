"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const http = __importStar(require("http"));
const querystring_1 = require("querystring");
const static_1 = require("./static");
const todo_list_1 = require("./todo_list");
function getContent(req, callback) {
    if (req.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const todo = (0, querystring_1.parse)(body);
            callback(todo);
        });
    }
    else {
        callback(null);
    }
}
const server = http.createServer((req, res) => {
    var _a, _b;
    const date = new Date().toISOString();
    console.log(date);
    if ((0, static_1.staticElement)(req.url)) {
        (0, static_1.serveStaticElement)(req, res);
    }
    else if (req.url == "/") {
        axios_1.default.get('http://localhost:3000/todos')
            .then(response => {
            (0, todo_list_1.sendPageResponse)((0, todo_list_1.initialPage)(date, null, response.data), res);
        })
            .catch(error => {
            console.log('Error: ' + error);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Could not get the todos</h1>');
            res.end();
        });
    }
    else if (req.url == "/addTodo") {
        getContent(req, data => {
            if (data) {
                axios_1.default.post('http://localhost:3000/todos', data)
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
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h1>Could not collect the data</h1>');
                res.end();
            }
        });
    }
    else if (/\/todos\/markDone\/[0-9]+/i.test((_a = req.url) !== null && _a !== void 0 ? _a : "")) {
        const id = (_b = req.url) === null || _b === void 0 ? void 0 : _b.split('/')[3];
        if (id != null) {
            axios_1.default.get('http://localhost:3000/todos/' + id)
                .then(response => {
                console.dir(response.data);
                const todo = response.data;
                todo.done = true;
                axios_1.default.put('http://localhost:3000/todos/' + id, todo)
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
        }
        else {
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
