const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const dataPath = path.join(__dirname, 'gestao_oficina.json');
let dados = {};

if (fs.existsSync(dataPath)) {
    dados = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} else {
    console.error("Arquivo de dados não encontrado!");
}

const server = http.createServer((req, res) => {
    const css = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        h1, h2 {
            color: #333;
            text-align: center;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background-color: #fff;
            margin: 8px 0;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        a {
            text-decoration: none;
            color: #3498db;
        }
        a:hover {
            text-decoration: underline;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .service-link {
            font-size: 18px;
            font-weight: bold;
        }
        .details p {
            font-size: 16px;
            line-height: 1.6;
        }
        .back-link {
            display: block;
            text-align: center;
            margin-top: 20px;
            font-size: 18px;
            color: #3498db;
        }
        .back-link:hover {
            text-decoration: underline;
        }
    `;

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let html = `
            <html>
                <head>
                    <style>${css}</style>
                    <title>Lista de Reparacoes</title>
                </head>
                <body>
                    <div class="container">
                        <h1>Lista de Reparacoes</h1>
                        <ul>`;
        
        dados.servicos.forEach(servico => {
            html += `<li><a class="service-link" href="/reparacao/${servico.id}">${servico.cliente} - ${servico.data}</a></li>`;
        });

        html += `</ul><a class="back-link" href="/operacoes">Ver todas as operacoes</a></div></body></html>`;
        res.end(html);
    } else if (req.url.startsWith('/reparacao/')) {
        const id = req.url.split('/').pop();
        const servico = dados.servicos.find(s => s.id == id);

        if (!servico) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end(`
                <html>
                    <head>
                        <style>${css}</style>
                        <title>Reparação não encontrada</title>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Reparação não encontrada</h1>
                            <a class="back-link" href="/">Voltar para a lista</a>
                        </div>
                    </body>
                </html>
            `);
        }

        const carro = dados.carros.find(c => c.id === servico.carro);
        let html = `
            <html>
                <head>
                    <style>${css}</style>
                    <title>Detalhes da Reparação</title>
                </head>
                <body>
                    <div class="container">
                        <h1>Detalhes da Reparação</h1>
                        <div class="details">
                            <p><strong>Cliente:</strong> ${servico.cliente}</p>
                            <p><strong>Contribuinte:</strong> ${servico.contribuinte}</p>
                            <p><strong>Data:</strong> ${servico.data}</p>
                            <p><strong>Carro:</strong> ${carro.fabricante} ${carro.modelo} - ${carro.id}</p>
                        </div>
                        <h2>Operacoes</h2>
                        <ul>`;

        // Ordenar as operações pelo código
        const operacoesOrdenadas = Object.keys(servico.operacoes).sort((a, b) => a.localeCompare(b));

        operacoesOrdenadas.forEach(opId => {
            const operacao = dados.operacoes.find(o => o.id == opId);
            html += `<li><a href="/operacao/${operacao.id}">${operacao.id} - ${operacao.nome}</a> - Quantidade: ${servico.operacoes[opId]}</li>`;
        });

        html += `</ul><a class="back-link" href="/">Voltar para a lista</a></div></body></html>`;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else if (req.url.startsWith('/operacao/')) {
        const opId = req.url.split('/').pop();
        const operacao = dados.operacoes.find(o => o.id == opId);

        if (!operacao) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end(`
                <html>
                    <head>
                        <style>${css}</style>
                        <title>Operacao não encontrada</title>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Operacao não encontrada</h1>
                            <a class="back-link" href="/operacoes">Voltar para a lista de operacoes</a>
                        </div>
                    </body>
                </html>
            `);
        }

        let html = `
            <html>
                <head>
                    <style>${css}</style>
                    <title>Detalhes da Operacao</title>
                </head>
                <body>
                    <div class="container">
                        <h1>Detalhes da Operacao: ${operacao.id} - ${operacao.nome}</h1>
                        <p><strong>Descricao:</strong> ${operacao.descricao}</p>
                        <h2>Reparacoes relacionadas</h2>
                        <ul>`;

        operacao.servicos.forEach(index => {
            const servico = dados.servicos[index];
            html += `<li><a href="/reparacao/${servico.id}">${servico.cliente} - ${servico.data}</a></li>`;
        });

        html += `</ul><a class="back-link" href="/operacoes">Voltar para a lista de operacoes</a></div></body></html>`;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else if (req.url === '/operacoes') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let html = `
            <html>
                <head>
                    <style>${css}</style>
                    <title>Lista de Operacoes</title>
                </head>
                <body>
                    <div class="container">
                        <h1>Operacoes Disponíveis</h1>
                        <ul>`;

        // Ordenar as operações por código
        const operacoesOrdenadas = dados.operacoes.sort((a, b) => a.id.localeCompare(b.id));

        operacoesOrdenadas.forEach(operacao => {
            html += `<li><a href="/operacao/${operacao.id}">${operacao.id} - ${operacao.nome}</a></li>`;
        });

        html += `</ul><a class="back-link" href="/">Voltar para a lista de reparações</a></div></body></html>`;
        res.end(html);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head>
                    <style>${css}</style>
                    <title>Página não encontrada</title>
                </head>
                <body>
                    <div class="container">
                        <h1>Página não encontrada</h1>
                        <a class="back-link" href="/">Voltar para a lista de reparações</a>
                    </div>
                </body>
            </html>
        `);
    }
});

server.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
});
