# Primeiro TPC do semestre
2025-02-15
## Resumo

### Problema
1. TPC1: A Oficina

2. Construir um serviço em nodejs, que consuma a API de dados servida pelo json-server da oficina de reparações e responda com as páginas web do site.

### Funcionamento
Neste trabalho, utilizou-se o JSON dataset_reparacoes.json fornecido pelo docente, que foi processado pelo script gestao_oficina.py para criar uma estrutura válida para o server, resultando no ficheiro gestao_oficina.json. 
O servidor lê dados de um arquivo JSON (gestao_oficina.json) que contem informações sobre reparações, carros e operações. Quando acedido pela rota raiz (/), o servidor exibe uma lista de reparações, permitindo ao usuário visualizar detalhes de cada uma, incluindo o cliente, carro e operações realizadas. Para cada operação, há um link que leva à descrição detalhada da operação e suas reparações associadas. Caso a página ou o item solicitado não seja encontrado, é retornado um erro 404.

### Instruções  

### Preparar o dataset:  

```bash
$ python gestao_oficina.py
```
### Iniciar o json-server:
```bash
$ json-server --watch gestao_oficina.json
```

### Iniciar o servidor:
```bash
$ node server.js
```
