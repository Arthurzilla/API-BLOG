const userService = require('../services/user.service')
const mongoose = require('mongoose');

const save = async (req, res) =>{
    const {
        name, username, email, password, avatar
    } = req.body;

    if(!name || !username || !email || !password || !avatar ){
        res.status(400).send({message: "preencha os campos corretamente"})
    }

    const user = await userService.saveService(req.body)

    if(!user){
        res.status(400).send({message: "erro ao cadastrar user"})
    }

    res.status(201).send({
        message: "usuário criado com sucesso",
        user:{
            id: user._id,
            name,
            username,
            email,
            avatar
        }
    })
}

const findAll = async (req, res) => {

    const users = await userService.findAllService()

    if(users.length === 0){
        return res.status(200).send({message: "não há usuário cadastrados"})
    }

    res.status(200).send(users)
}


//procurar usário por id
const findById = async (req, res) => {
//declara o id
const id = req.params.id

if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({message: 'ID inválido'})
}
//declara o usuário
const user = await userService.findByIdService(id)
if(!user){
    res.status(400).send({message: "usuário não encontrado"})
}
    res.status(200).send(user)
}
module.exports = { save , findAll, findById}
