# 🎬 Gestão de Cinema

## 🔹 Visão Geral
Este sistema utiliza um servidor web desenvolvido com **Express.js**, gerando páginas interativas a partir de dados extraídos de uma **API JSON**. A aplicação permite aos utilizadores visualizar, editar e remover registos de filmes, além de possibilitar a filtragem por atores.

## ✨ Funcionalidades
- **📜 Listar Todos os Filmes** – Exibir uma tabela com todos os filmes e os seus detalhes.
- **🎭 Ver Filmes por Ator** – Filtrar e visualizar apenas os filmes em que um determinado ator participa.
- **✏️ Editar Detalhes de Filmes** – Atualizar informações dos filmes, incluindo título, ano de lançamento, elenco e géneros.
- **🗑️ Eliminar Filmes** – Remover registos de filmes da base de dados.

## 📂 Estrutura do Projeto
A estrutura do projeto está organizada da seguinte forma:

- **`app.js`** – Configuração principal da aplicação **Express**, incluindo rotas, middleware e gestão de erros.
- **`routes/index.js`** – Controlador responsável pela página inicial.
- **`routes/filmes.js`** – Módulo dedicado ao processamento das operações relacionadas com filmes.
- **`views/`** – Diretório contendo os templates **Pug** utilizados para renderizar as páginas:
  - `filmes.pug` – Exibição da lista de todos os filmes.
  - `filmeEdit.pug` – Página para edição de informações de um filme.
  - `filmesAtor.pug` – Apresentação de filmes filtrados por ator.
  - `index.pug` – Página inicial da aplicação.
  - `layout.pug` – Template base utilizado nas páginas.
  - `error.pug` – Página dedicada à exibição de mensagens de erro.
- **`cinema.json`** – Base de dados em **JSON** contendo informações sobre os filmes.
- **`addId.py`** – Script Python para adicionar identificadores únicos aos registos de filmes.

## 🚀 Como Executar
### 1️⃣ Instalar as Dependências
```bash
npm install
```

### 2️⃣ Adicionar IDs aos Filmes (Opcional)
```bash
python addId.py
```

### 3️⃣ Iniciar a API de Dados
```bash
json-server --watch cinema.json
```

### 4️⃣ Iniciar o Servidor Web
```bash
npm start
```

### 5️⃣ Aceder à Aplicação
Abra o navegador e aceda ao seguinte endereço:
```
http://localhost:1501
```