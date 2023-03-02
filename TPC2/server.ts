import { readFile } from 'fs';
import { createServer } from 'http';

const html_files_directory = 'html_files/';

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url != undefined) {

        if (req.url == "/") {
            readFile(html_files_directory + 'index.html', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.write(data);
                    res.end();
                }
            });
        }
        else {
            readFile(html_files_directory + req.url.substring(1), (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.write(data);
                    res.end();
                }
            });
        }
    }

});

server.listen(8080);

console.log('Server running at http://localhost:8080');
