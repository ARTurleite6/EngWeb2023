import { readFileSync } from 'fs';

export function pessoasPage(pessoas, _data) {
    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Pessoas</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr>
                `

    pessoas.forEach(pessoa => {
        pagHTML += `
                    <tr>
                        <td>${pessoa.id}</td>
                        <td><a href="/pessoas/${pessoa.id}">${pessoa.nome}</a></td>
                        <td>${pessoa.idade}</td>
                        <td>${pessoa.sexo}</td>
                        <td>${pessoa.morada.cidade}</td>
                    </tr>
                `
    });

    pagHTML += `
            </table>
    </body>
    `

    return pagHTML;
}

export function getDesportoPage(lista_pessoas, _data) {

    const desportos = new Map();

    lista_pessoas.forEach(pessoa => {
        pessoa.desportos.forEach(desporto => {
            if (!desportos.has(desporto)) {
                desportos.set(desporto, 1);
            }
            else {
                desportos.set(desporto, desportos.get(desporto) + 1);
            }
        });
    });

    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Numero de Pessoas de Cada Desporto</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                    <tr>
                        <th>Desporto</th>
                        <th>Numero de Pessoas</th>
                    </tr>
                `

    desportos.forEach((value, key) => {
        pagHTML += `
        <tr>
            <th>${key}</th>
                    <td><a href="/pessoas/desportos/${key}">${value}</a></td>
        </tr>`
    });

    pagHTML += "</tr>"
    pagHTML += `
    </table>
    </body>
    `

    return pagHTML;

}

export function getSexoPage(lista_pessoas, _data) {

    let counterFeminino = 0;
    let counterMasculino = 0;
    let counterOutro = 0;

    lista_pessoas.forEach(pessoa => {
        if (pessoa.sexo === 'feminino') {
            counterFeminino++;
        } else if (pessoa.sexo === 'masculino') {
            counterMasculino++;
        } else {
            counterOutro++;
        }
    });

    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Numero de Pessoas de Cada Sexo</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                    <tr>
                        <th>Masculino</th>
                        <th>Feminino</th>
                        <th>Outro</th>
                    </tr>
                `

    pagHTML += `
                    <tr>
                        <td><a href="/pessoas/masculino">${counterMasculino}</a></td>
                        <td><a href="/pessoas/feminino">${counterFeminino}</a></td>
                        <td><a href="/pessoas/outro">${counterOutro}</a></td>
                    </tr>
                `

    pagHTML += `
            </table>
    </body>
    `

    return pagHTML;

}

export function pessoaPage(pessoa, _data) {

    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Dados de Pessoa</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr>
                `

    pagHTML += `
                    <tr>
                        <td>${pessoa.id}</td>
                        <td>${pessoa.nome}</td>
                        <td>${pessoa.idade}</td>
                        <td>${pessoa.sexo}</td>
                        <td>${pessoa.morada.cidade}</td>
                    </tr>
                `

    pagHTML += `
            </table>
    </body>
    `

    return pagHTML;
}

export function getTopProfissoes(lista_pessoas, data) {

    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Dados de Pessoa</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                    <tr>
                        <th>Top</th>
                        <th>Profissão</th>
                    </tr>
                `

    const profissoes = new Map();
    lista_pessoas.forEach(pessoa => {
        if (!profissoes.has(pessoa.profissao))
            profissoes.set(pessoa.profissao, 1);
        else
            profissoes.set(pessoa.profissao, profissoes.get(pessoa.profissao) + 1);
    });

    const profissoes_array = Array.from(profissoes);
    profissoes_array.sort((a, b) => b[1] - a[1]);
    const top_profissoes = profissoes_array.slice(0, 10);

    top_profissoes.map((value, index) => {
        pagHTML += `
            <tr>
            <th>${index + 1}</th>
            <td>${value[0]}</td>
            </tr>`
    });

    pagHTML += `
            </table>
    </body>
    `

    return pagHTML;

}

export function getW3CSS() {

    const w3css = readFileSync('./public/w3.css', 'utf-8');
    console.log('w3.css loaded');
    console.dir(w3css);

    return w3css;
}
