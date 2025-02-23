export function genMainPage(data) {
    return `
    <!DOCTYPE html>
    <html lang="pt">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Escola de Música</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    background-color:rgb(6, 171, 151);
                    margin: 0;
                    padding: 0;
                    color: #333;
                }
                header {
                    background-color: #000000;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    font-size: 2.5em;
                    margin: 0;
                }
                main {
                    padding: 30px 20px;
                    text-align: center;
                }
                .content {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 20px;
                }
                .content a {
                    text-decoration: none;
                    background-color: #2196F3;
                    color: white;
                    padding: 15px 30px;
                    border-radius: 5px;
                    font-size: 1.2em;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: background-color 0.3s, transform 0.3s;
                }
                .content a:hover {
                    background-color: #1976D2;
                    transform: translateY(-3px);
                }
                footer {
                    background-color: #333;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    position: fixed;
                    width: 100%;
                    bottom: 0;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>Bem-vindo à Escola de Música</h1>
            </header>

            <main>
                <div class="content">
                    <a href="/alunos">Lista de Alunos</a>
                    <a href="/cursos">Lista de Cursos</a>
                    <a href="/instrumentos">Lista de Instrumentos</a>
                </div>
            </main>

            <footer>
                <p>Data: ${data}</p>
            </footer>
        </body>
    </html>`;
}

export function genAlunosPage(alunos, data) {
    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color:rgb(6, 171, 151); }
            </style>
        </head>
        <body>
            <h1>Lista de Alunos</h1>
            <table>
                <tr><th>ID</th><th>Nome</th><th>Curso</th><th>DataNascimento</th><th>Ano</th><th>Instrumento</th></tr>`;
    
    alunos.forEach(aluno => {
        pagHTML += `
        <tr>
            <td><a href='/aluno/${aluno.id}'>${aluno.id}</a></td>
            <td>${aluno.nome}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.dataNasc}</td>
            <td>${aluno.anoCurso}</td>
            <td>${aluno.instrumento}</td>
        </tr>`;
    })

    pagHTML += `</table>
            <footer><p>Data: ${data}</p></footer>
        </body>
    </html>`;
    return pagHTML;
}

export function genCursosPage(cursos, data) {
    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color:rgb(6, 171, 151) }
            </style>
        </head>
        <body>
            <h1>Lista de Cursos</h1>
            <table>
                <tr><th>Código<th>Designação</th></tr>`;

    cursos.forEach(curso => {
        pagHTML += `
        <tr>
            <td><a href='/curso/${curso.id}'>${curso.id}</a></td>
            <td>${curso.designacao}</td>
        </tr>`;
    });
    
    pagHTML += `</table>
            <footer><p>Data: ${data}</p></footer>
        </body>
    </html>`;
    return pagHTML;
}

export function genInstrumentosPage(instrumentos, data) {
    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color:rgb(6, 171, 151) }
            </style>
        </head>
        <body>
            <h1>Lista de Instrumentos</h1>
            <table>
                <tr><th>ID</th><th>Nome</th></tr>`;

    instrumentos.forEach(instrumento => {
        pagHTML += `<tr><td><a href='/instrumento/${instrumento.id}'>${instrumento.id}</a></td><td>${instrumento["#text"]}</td></tr>`;
    });

    pagHTML += `
            </table>
            <footer><p>Data: ${data}</p></footer>
        </body>
    </html>`;
    return pagHTML;
}



export function genAlunoPage(aluno, data) {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Aluno ${aluno.nome}</title>
            <style>
                body { font-family: Arial, sans-serif; }
            </style>
        </head>
        <body>
            <h1>Detalhes do Aluno ${aluno.nome}</h1>
            <ul>
                <li>ID: ${aluno.id}</li>
                <li>Nome: ${aluno.nome}</li>
                <li>Curso: ${aluno.curso}</li>
                <li>Data de Nascimento: ${aluno.dataNasc}</li>
                <li>Ano do Curso: ${aluno.anoCurso}</li>
                <li>Instrumento: ${aluno.instrumento}</li>
            </ul>
            <footer><p>Data: ${data}</p></footer>
        </body>
    </html>`;
}

export function genCursoPage(curso, alunos, data) {
    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Curso: ${curso.designacao}</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color:rgb(6, 171, 151) }
            </style>
        </head>
        <body>
            <h1>${curso.designacao}</h1>
            <h2>Alunos Matriculados</h2>
            <table>
                <tr><th>ID</th><th>Nome</th></tr>`;
    
    alunos.forEach(aluno => {
        pagHTML += `<tr><td>${aluno.id}</td><td>${aluno.nome}</td></tr>`;
    });

    pagHTML += `
            </table>
            <footer><p>Data: ${data}</p></footer>
        </body>
    </html>`;
    return pagHTML;
}

export function genInstrumentoPage(instrumento, alunos, data) {
    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Instrumento: ${instrumento["#text"]}</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color:rgb(6, 171, 151) }
            </style>
        </head>
        <body>
            <h1>${instrumento["#text"]}</h1>
            <h2>Alunos que tocam este instrumento</h2>
            <table>
                <tr><th>ID</th><th>Nome</th></tr>`;

    alunos.forEach(aluno => {
        pagHTML += `<tr><td>${aluno.id}</td><td>${aluno.nome}</td></tr>`;
    });

    pagHTML += `
            </table>
            <footer><p>Data: ${data}</p></footer>
        </body>
    </html>`;
    return pagHTML;
}
