"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStaticElement = exports.staticElement = void 0;
const fs_1 = require("fs");
function staticElement(element) {
    if (!element)
        return false;
    return /\/w3.css$/i.test(element);
}
exports.staticElement = staticElement;
function serveStaticElement(req, res) {
    var _a;
    const partes = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('/');
    if (partes) {
        const file = partes[partes.length - 1];
        (0, fs_1.readFile)('public/' + file, (erro, dados) => {
            if (erro) {
                console.log('Erro: ficheiro não encontrado ' + erro);
                res.statusCode = 404;
                res.end('Erro: ficheiro não encontrado ' + erro);
            }
            else {
                if (file == 'favicon.ico') {
                    res.setHeader('Content-Type', 'image/x-icon');
                    res.end(dados);
                }
                else if (file == 'w3.css') {
                    res.setHeader('Content-Type', 'text/css');
                    res.end(dados);
                }
                // PNG images
                else {
                    res.setHeader('Content-Type', 'image/png');
                    res.end(dados);
                }
            }
        });
    }
    else {
        res.statusCode = 404;
        res.end('Erro: ficheiro não encontrado');
    }
}
exports.serveStaticElement = serveStaticElement;
