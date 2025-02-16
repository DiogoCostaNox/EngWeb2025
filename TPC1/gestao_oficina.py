import json

class Oficina:
    def __init__(self, servicos, carros, operacoes, fabricantes):
        self.servicos = servicos
        self.carros = carros
        self.operacoes = operacoes
        self.fabricantes = fabricantes

class Servico:
    def __init__(self, identificador, cliente, contribuinte, data, carro, operacoes):
        self.id = identificador
        self.cliente = cliente
        self.contribuinte = contribuinte
        self.data = data
        self.carro = carro
        self.operacoes = operacoes

    def __str__(self):
        return f'{self.cliente} - {self.contribuinte} - {self.data} - {self.carro} - {self.operacoes}'

class Carro:
    def __init__(self, fabricante, modelo, placa, servicos):
        self.id = placa 
        self.fabricante = fabricante
        self.modelo = modelo
        self.servicos = servicos

    def __str__(self):
        return f'{self.fabricante} - {self.modelo} - {self.id} - {self.servicos}'

class Operacao:
    def __init__(self, codigo, nome, descricao, servicos):
        self.id = codigo
        self.nome = nome
        self.descricao = descricao
        self.servicos = servicos

    def __str__(self):
        return f'{self.id} - {self.nome} - {self.descricao} - {self.servicos}'

class Fabricante:
    def __init__(self, id, servicos):
        self.id = id
        self.servicos = servicos

    def __str__(self):
        return f'{self.id} - {self.servicos}'

def main():
    servicos = []
    carros = {}
    operacoes = {}
    fabricantes = {}
    
    with open('dataset_reparacoes.json', 'r', encoding="utf-8") as f:
        try:
            dados = json.load(f)
        except json.JSONDecodeError as e:
            print(f"Erro ao decodificar JSON: {e}")
            return
        
        for indice, servico in enumerate(dados['reparacoes']):
            operacoes_servico = {}
            for operacao in servico['intervencoes']:
                if operacao['codigo'] not in operacoes:
                    operacoes[operacao['codigo']] = Operacao(operacao['codigo'], operacao['nome'], operacao['descricao'], [indice])
                else:
                    operacoes[operacao['codigo']].servicos.append(indice)
                
                if operacao['codigo'] not in operacoes_servico:
                    operacoes_servico[operacao['codigo']] = 1
                else:
                    operacoes_servico[operacao['codigo']] += 1
                
            if servico['viatura']['matricula'] not in carros:
                carros[servico['viatura']['matricula']] = Carro(servico['viatura']['marca'], servico['viatura']['modelo'], servico['viatura']['matricula'], [indice])
            else:
                carros[servico['viatura']['matricula']].servicos.append(indice)
            
            if servico['viatura']['marca'] not in fabricantes:
                fabricantes[servico['viatura']['marca']] = Fabricante(servico['viatura']['marca'], [indice])
            else:
                fabricantes[servico['viatura']['marca']].servicos.append(indice)
            
            servicos.append(Servico(indice, servico['nome'], servico['nif'], servico['data'], servico['viatura']['matricula'], operacoes_servico))
    
    oficina = Oficina(servicos, list(carros.values()), list(operacoes.values()), list(fabricantes.values()))
    
    with open('gestao_oficina.json', 'w', encoding="utf-8") as f:
        f.write(json.dumps(oficina, default=lambda o: o.__dict__, indent=4))

if __name__ == '__main__':
    main()
