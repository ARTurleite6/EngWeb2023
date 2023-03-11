import { IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs";

export function staticElement(element: string | undefined): boolean {
    if (!element) return false;
    return /\/w3.css$/i.test(element);
}

export function serveStaticElement(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const partes = req.url?.split('/')
    if (partes) {
        const file = partes[partes.length - 1]
        readFile('public/' + file, (erro, dados) => {
            if (erro) {
                console.log('Erro: ficheiro não encontrado ' + erro)
                res.statusCode = 404
                res.end('Erro: ficheiro não encontrado ' + erro)
            }
            else {
                if (file == 'favicon.ico') {
                    res.setHeader('Content-Type', 'image/x-icon')
                    res.end(dados)
                }
                else if (file == 'w3.css') {
                    res.setHeader('Content-Type', 'text/css')
                    res.end(dados)
                }
                // PNG images
                else {
                    res.setHeader('Content-Type', 'image/png')
                    res.end(dados)
                }
            }
        })
    }
    else {
        res.statusCode = 404
        res.end('Erro: ficheiro não encontrado')
    }
}

