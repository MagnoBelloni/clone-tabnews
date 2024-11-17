function status(request, response) {
    response.status(200).json({ chave: "Olha a resposta" })
}

export default status