const http = require ('http')
const fs = require ('fs')


//Função para ler os dados do arquivo JSON e retornar em uma lista como resultado
function Lista() {
    try {
        const fileContents = fs.readFileSync("dados.json", "utf-8");
        const dados = fileContents ? JSON.parse(fileContents) : { produtos: [] };
        return JSON.stringify(dados.produtos);
    } catch (erro) {
        return "Erro na execução: " + erro.message;
    }
}

    //Função para cadastrar um novo produto
    function CadastroDoProduto(novoProduto) {
        try {
            const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8"));
            const produto = JSON.parse(novoProduto);
            
             // Verificar se todos os campos obrigatórios estão presentes
            if (!produto.nome || !produto.peso || !produto.quantidade || !produto.codigo) {
                return "Preecha os campos obrigatórios!";
            }

            const produtoExiste = dados.produtos.find((p) => p.nome === produto.nome);
            if (produtoExiste) {
                return "Produto já cadastrado!";
            }
            dados.produtos.push(produto);
            fs.writeFileSync("dados.json", JSON.stringify(dados));
            return "Produto cadastrado com sucesso!";
        } catch (erro) {
            return "Erro ao executar: " + erro.message;
        }
    }
    

//criando o servidor 

const server = http.createServer((request, response) =>{
    switch(request.method){

        //criando a lógica do método GET que vai retornar uma lista com todos os produtos
        case "GET":
            response.writeHead(200, {'Content-Type': 'application/json; charset: utf-8;'});
            const listaProdutos = Lista()
            response.end(listaProdutos)
            break
        // criando a lógica do método POST que vai 
            case "POST":
                let data = '';
                request.on("data", (chunk) => {
                  data += chunk;
                });
          
                request.on("end", () => {
                  response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8;" });
                  response.end(CadastroDoProduto(data));
                });
                break;
          
              default:
                response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8;" });
                response.end("Recurso não encontrado.");
            }
          });

// definindo a porta que o servidor vai rodar
const port = 3000;

//criando o listen para iniciar  o servidor
server.listen(port, () =>{
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})


//Testando o cadastro de produtos
function testeCadastro(){
    const cadastroProduto= [
{
    "nome": "Bolo de chocolate",
    "peso": "350g",
    "quantidade": 5,
  
}
];

for (const produtos of cadastroProduto) {
    const resultado = CadastroDoProduto(JSON.stringify(produtos))
    console.log(resultado)
}

const listaProdutos = Lista();
console.log(listaProdutos)
}
testeCadastro()



