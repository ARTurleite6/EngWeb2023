"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http_1 = require("http");
const html_files_directory = 'html_files/';
const server = (0, http_1.createServer)((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (req.url != undefined) {
        if (req.url == "/") {
            (0, fs_1.readFile)(html_files_directory + 'index.html', (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.write(data);
                    res.end();
                }
            });
        }
        else {
            (0, fs_1.readFile)(html_files_directory + req.url.substring(1), (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.write(data);
                    res.end();
                }
            });
        }
    }
});
server.listen(8080);
console.log('Server running at http://localhost:8080');
