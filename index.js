const http = require ('http')
const fs = require ('fs')

//criando o servidor usando o método createServer
//a função callback vai receber os parâmetros request e response
const server = http.createServer((request, response) =>{
    
    //writeHead é o método do objeto response que define o código de status, no caso 200
    response.writeHead(200, {'Content-Type': 'application/json; charset: utf-8;'});
    response.end('Hello World!')
});

// definindo a porta que o servidor vai rodar
const port = 3000;

//criando o listen para iniciar  o servidor
server.listen(port, () =>{
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})