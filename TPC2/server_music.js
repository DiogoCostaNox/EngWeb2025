import { createServer } from 'http'
import axios from 'axios'
import { genMainPage, genAlunosPage, genCursosPage, genInstrumentosPage, genAlunoPage, genCursoPage, genInstrumentoPage } from './music_pages.js'

createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write(genMainPage(d))
        res.end()
    } 
    else if (req.url == '/alunos') {
        axios.get('http://localhost:3000/alunos')
            .then(response => {
                var alunos = response.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write(genAlunosPage(alunos, d))
                res.end()
            })
            .catch(error => {
                console.log("ERRO: " + error)
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<p>ERRO: ' + error + '</p>')
                res.end()
            })
    }
    else if (req.url.startsWith('/aluno/')) {
        const alunoId = req.url.split('/')[2]
        axios.get(`http://localhost:3000/alunos/${alunoId}`)
            .then(response => {
                var aluno = response.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write(genAlunoPage(aluno, d))
                res.end()
            })
            .catch(error => {
                console.log("ERRO: " + error)
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<p>ERRO: ' + error + '</p>')
                res.end()
            })
    }
    else if (req.url == '/cursos') {
        axios.get('http://localhost:3000/cursos')
            .then(response => {
                var cursos = response.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write(genCursosPage(cursos, d))
                res.end()
            })
            .catch(error => {
                console.log("ERRO: " + error)
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<p>ERRO: ' + error + '</p>')
                res.end()
            })
    }
    else if (req.url.startsWith('/curso/')) {
        const cursoId = req.url.split('/')[2]
        axios.get(`http://localhost:3000/cursos/${cursoId}`)
            .then(response => {
                var curso = response.data
                axios.get('http://localhost:3000/alunos')
                    .then(alunosResponse => {
                        const alunos = alunosResponse.data.filter(aluno => aluno.curso === cursoId)
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(genCursoPage(curso, alunos, d))
                        res.end()
                    })
            })
            .catch(error => {
                console.log("ERRO: " + error)
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<p>ERRO: ' + error + '</p>')
                res.end()
            })
    }
    else if (req.url == '/instrumentos') {
        axios.get('http://localhost:3000/instrumentos')
            .then(response => {
                var instrumentos = response.data
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write(genInstrumentosPage(instrumentos, d))
                res.end()
            })
            .catch(error => {
                console.log("ERRO: " + error)
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<p>ERRO: ' + error + '</p>')
                res.end()
            })
    }
    else if (req.url.startsWith('/instrumento/')) {
        const instrumentoId = req.url.split('/')[2]; 
    
        axios.get('http://localhost:3000/instrumentos')
            .then(response => {
                const instrumentos = response.data;
                const instrumento = instrumentos.find(i => i.id == instrumentoId); 
    
                if (instrumento) {
                    axios.get('http://localhost:3000/alunos')
                        .then(alunosResponse => {
                            const alunos = alunosResponse.data.filter(aluno => aluno.instrumento === instrumento["#text"]);
                            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.write(genInstrumentoPage(instrumento, alunos, d));
                            res.end();
                        })
                        .catch(error => {
                            console.log("ERRO: " + error);
                            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.write('<p>ERRO: ' + error + '</p>');
                            res.end();
                        });
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.write('<p>Instrumento não encontrado</p>');
                    res.end();
                }
            })
            .catch(error => {
                console.log("ERRO: " + error);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write('<p>ERRO: ' + error + '</p>');
                res.end();
            });    
    }    
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end('<p>Operação não suportada: ' + req.url + '</p>')
    }
}).listen(3017)

console.log('Servidor a correr na porta 3017...')
