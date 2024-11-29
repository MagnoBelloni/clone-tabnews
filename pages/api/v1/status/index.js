import database from "../../../../infra/database.js"

async function status(request, response) {
    const result = await database.query('SELECT 1 + 1 as Soma;')
    console.log(result.rows)
    response.status(200).json({ chave: "Olha a resposta" })
}

export default status