import * as http from 'http';
import * as pessoas from './pessoas.js';
import axios from 'axios';

const w3css = pessoas.getW3CSS();

const server = http.createServer((req, res) => {
    const data = new Date().toISOString().substring(0, 16);
    console.log(`${req.method} ${req.url} ${data}`);

    switch (req.method) {
        case "GET": {
            if (req.url === '/' || req.url === '/pessoas') {
                res.writeHead(200, { 'Content-Type': 'text/html' });

                axios.get('http://localhost:3000/pessoas')
                    .then(response => {
                        res.write(pessoas.pessoasPage(response.data, data));
                        res.end();
                    })
                    .catch(error => {
                        console.log(error);
                        res.end();
                    });
            }
            else if (req.url === "/pessoasOrdenadas") {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                axios.get('http://localhost:3000/pessoas?_sort=nome&order=asc')
                    .then(response => {
                        res.write(pessoas.pessoasPage(response.data, data));
                        res.end();
                    })
                    .catch(error => {
                        console.log(error);
                        res.end();
                    });
            }
            else if (req.url === "/pessoas/sexos") {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                axios.get('http://localhost:3000/pessoas?_sort=sexo&order=asc')
                    .then(response => {
                        res.write(pessoas.getSexoPage(response.data, data));
                        res.end();
                    })
                    .catch(error => {
                        console.log(error);
                        res.end();
                    });
            }
            else if (req.url === "/pessoas/desportos") {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                axios.get('http://localhost:3000/pessoas')
                    .then(response => {
                        res.write(pessoas.getDesportoPage(response.data, data));
                        res.end();
                    })
                    .catch(error => {
                        console.log(error);
                        res.end();
                    });
            }
            else if (req.url.match(/\/pessoas\/desportos\/\w+$/)) {
                const desporto = req.url.substring(19);
                console.log(desporto);
                axios.get('http://localhost:3000/pessoas?desportos=' + desporto)
                    .then(response => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(pessoas.pessoasPage(response.data, data));
                        res.end();
                    })
                    .catch(error => {
                        console.log(error);
                        res.end();
                    });
            }
            else if (req.url === "/pessoas/profissoes") {
                axios.get("http://localhost:3000/pessoas")
                    .then(response => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(pessoas.getTopProfissoes(response.data, data));
                        res.end();
                    })
                    .catch(error => {
                        console.log(error);
                        res.end();
                    });
            }
            else if (req.url.match(/\/pessoas\/p\d+$/)) {
                const id = req.url.substring(9);
                axios.get('http://localhost:3000/pessoas/' + id)
                    .then(response => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(pessoas.pessoaPage(response.data, data));
                        res.end();
                    })
                    .catch(error => {
                        console.log(error);
                        res.end();
                    });
            }
            else if (req.url.match(/\/pessoas\/\w+$/)) {
                const sexo = req.url.substring(9);
                console.dir(sexo);
                if (sexo != "feminino" && sexo != "masculino" && sexo != "outro") {
                    console.log('error, sexo não suportado');
                    res.end();
                } else {
                    axios.get('http://localhost:3000/pessoas?sexo=' + sexo)
                        .then(response => {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write(pessoas.pessoasPage(response.data, data));
                            res.end();
                        })
                        .catch(error => {
                            console.log(error);
                            res.end();
                        });
                }
            }
            else if (req.url.match(/w3.css$/)) {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(w3css);
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Not Found</h1>');
            }
        }
    }


});

server.listen(7777);
console.log('Server is running on http://localhost:7777');
