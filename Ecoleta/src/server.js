
const express = require("express")
const server = express()

// configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do red.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// pegar o banco de dados
const db = require("./database/db")


// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noChache: true,

})


// configurar caminhos da aplicação
// pagina inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})



server.get("/create-point", (req, res) => {

    // red.query: Query Strings da nossa url
    // console.log(req.query)
    
    
    
    
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // re.body: O corpo do nosso formulario
    // console.log(req.body)

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.render("create-point.html", { error: true})
        }
        
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)

})




server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        // pesquisa vazia
        return res.render("search.html", {total: 0})
    }

    

    // pegar os dados do banco de dados
    // 3 consutar os dados da tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search.html", {places: rows, total })
    })
})

// ligar o servidor
server.listen(3000)