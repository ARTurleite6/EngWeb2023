import json

class Ligacao:
    def __init__(self, id, cidade_origem, cidade_destino, distancia):
        self.id = id
        self.cidade_origem = cidade_origem
        self.cidade_destino = cidade_destino
        self.distancia = distancia



class Cidade:
    """
    Classe que representa uma cidades
    """
    def __init__(self, id, nome, populacao, descricao, distrito, ligacoes = []):
        self.id = id
        self.nome = nome
        self.populacao = populacao
        self.descricao = descricao
        self.distrito = distrito
        self.ligacoes = ligacoes

    def add_ligacao(self, ligacao):
        self.ligacoes.append(ligacao)

def parse_cidade(cidade):
    return Cidade(
        cidade['id'],
        cidade['nome'],
        cidade['população'],
        cidade['descrição'],
        cidade['distrito']
    )

def parse_ligacao(ligacao):
    return Ligacao(
        ligacao['id'],
        ligacao['origem'],
        ligacao['destino'],
        ligacao['distância']
    )

def parse_data(filename):
    data = None
    cidades = {}
    with open(filename) as f:
        data = json.load(f)
    if data is not None:
        for cidade in data['cidades']:
            cidade = parse_cidade(cidade)
            cidades[cidade.id] = cidade

        for ligacao in data['ligações']:
            ligacao = parse_ligacao(ligacao)
            cidades[ligacao.cidade_origem].add_ligacao(ligacao)

    return cidades

def make_index_html(cidades):
    file_str = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
    <ul>
    """

    for cidade in cidades.values():
        file_str += f"""
        <li>
            <h2><a href=\"/{cidade.id}.html\">{cidade.nome}</a></h2>
        </li>
        """
        make_city_html(cidade, cidades)

    file_str += """
    </ul>
    </body>
    </html>
    """

    with open('html_files/index.html', 'w') as f:
        f.write(file_str)

def make_city_html(cidade, cidades):
    file_str = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>{cidade.nome}</title>
    </head>
    <body>
    <h1>{cidade.nome}</h1>
    <p>População: {cidade.populacao}</p>
    <p>Distrito: {cidade.distrito}</p>
    <p>{cidade.descricao}</p>
    <h2>Ligações</h2>
    <ul>
    """
    
    for ligacao in cidade.ligacoes:
        file_str += f"""
        <li>
            <a href=\"/{ligacao.cidade_destino}.html\">{cidades[ligacao.cidade_destino].nome}</a>
        </li>
        """

    file_str += """
    </ul>
    </body>
    </html>
    """

    with open(f'html_files/{cidade.id}.html', 'w') as f:
        f.write(file_str)

def main():
    cidades = parse_data('mapa.json')
    make_index_html(cidades)
            

if __name__ == "__main__":
    main()
