import json
import os
import shutil

def open_json(filename):
    with open(filename,'r',encoding='utf-8') as file:
        data = json.load(file)

    return data

def mk_dir(relative_path):
    if not os.path.exists(relative_path):
        os.mkdir(relative_path)
    else:
        shutil.rmtree(relative_path)
        os.mkdir(relative_path)

def new_file(filename, content):
    f = open(filename, "w", encoding="utf-8")
    f.write(html)
    f.close()


# lista_nif = []
#json_obj = open_json('dataset_reparacoes.json')
#for reparacao in json_obj['reparacoes']:
#    if(reparacao['nif'] in lista_nif):
#        print(f"O nif {reparacao['nif']} já existe")
#    else:
#        lista_nif.append(reparacao['nif'])

#lista_matriculas = []
#for reparacao in json_obj['reparacoes']:
#    nif = reparacao['nif']
#    matricula = reparacao['viatura']['matricula']
#
#    if(matricula in lista_matriculas):
#        print(f"A matricula {matricula} já existe")
#    else:
#        lista_matriculas.append(matricula)


#Lista de Reparações
html = '''
<html>
    <head>
        <title>Reparações</title>
    </head>
    <body>
        <h1>Reparações</h1>
        <ul>
'''
json_obj = open_json('dataset_reparacoes.json')
for reparacao in json_obj['reparacoes']:
    data = reparacao['data']
    nif = reparacao['nif']
    nome = reparacao['nome']
    marca = reparacao['viatura']['marca']
    modelo = reparacao['viatura']['modelo']
    nr_intervencoes = reparacao['nr_intervencoes']

    html += f'<li>{data} || {nif} || {nome} || {marca} || {modelo} || {nr_intervencoes}</li>'
html += '''
        </ul>
    </body>
</html>
'''

new_file('lista_reparacoes.html',html)

#Lista de Intervenções
html = '''
<html>
    <head>
        <title>Intervenções</title>
    </head>
    <body>
        <h1>Intervenções</h1>
        <ul>
'''
map_intervencoes = {}
json_obj = open_json('dataset_reparacoes.json')
for reparacao in json_obj['reparacoes']:
    for intervencao in reparacao['intervencoes']:
        map_intervencoes[intervencao['codigo']] = intervencao

for codigo in sorted(map_intervencoes.keys()):
    nome = map_intervencoes[codigo]['nome']
    descricao = map_intervencoes[codigo]['descricao']
    html += f'<li>{codigo} || {nome} || {descricao}</li>'
html += '''
        </ul>
    </body>
</html>
''' 
new_file('lista_intervencoes.html', html)

# Lista de Carros
html = '''
<html>
    <head>
        <title>Carros</title>
    </head>
    <body>
        <h1>Carros</h1>
        <ul>
'''

map_carros_marca = {}
map_carros_modelo = {}
json_obj = open_json('dataset_reparacoes.json')

for reparacao in json_obj['reparacoes']:
    marca = reparacao['viatura']['marca']
    modelo = reparacao['viatura']['modelo']

    if modelo in map_carros_modelo:
        map_carros_modelo[modelo] += 1
    else:
        map_carros_modelo[modelo] = 1

    if marca in map_carros_marca:
        if modelo not in map_carros_marca[marca]:  
            map_carros_marca[marca].append(modelo)
    else:
        map_carros_marca[marca] = [modelo]  

for marca in sorted(map_carros_marca.keys()):
    numero_carros_marca = sum(map_carros_modelo[modelo] for modelo in map_carros_marca[marca])
    
    html += f"<li> {marca} #{numero_carros_marca}<ul>"

    for modelo in sorted(map_carros_marca[marca]):
        html += f'<li>{modelo} #{map_carros_modelo[modelo]}</li>'

    html += '</ul></li>'

html += '''
        </ul>
    </body>
</html>
''' 

new_file('lista_carros.html', html)
