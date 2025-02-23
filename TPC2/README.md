# Segundo TPC do semestre
2025-02-23
## Resumo

### Problema
1. TPC2: Escola de Música

2. Construir um serviço em nodejs, que consuma a API de dados servida pelo json-server da escola de música (implementada na segunda aula teórica) e sirva um website com as seguintes caraterísticas:

3. Página principal: Listar alunos, Listar Cursos, Listar Instrumentos;

4. Página de alunos: Tabela com a informação dos alunos (clicando numa linha deve saltar-se para a página de aluno);

5. Página de cursos: Tabela com a informação dos cursos (clicando numa linha deve saltar-se para a página do curso onde deverá aparecer a lista de alunos a frequentá-lo);

6. Página de instrumentos: Tabela com a informação dos instrumentos (clicando numa linha deve saltar-se para a página do instrumento onde deverá aparecer a lista de alunos que o tocam).

### Funcionamento
Neste trabalho, utilizou-se o JSON db.json fornecido pelo docente.
O código cria um servidor HTTP que responde a várias rotas, como /, /alunos, /cursos e /instrumentos, e cria páginas HTML dinâmicas com dados obtidos via API local usando Axios. As páginas são renderizadas com funções como genMainPage e genAlunosPage, exibindo informações sobre alunos, cursos e instrumentos. Em caso de erro, o servidor retorna mensagens de erro. O design da página principal foi atualizado com um cabeçalho preto e fundo azul claro. O servidor roda na porta 3017.

### Instruções  

### Iniciar o json-server:
```bash
$ json-server --watch db.json
```

### Iniciar o servidor:
```bash
$ node server_music.js
```