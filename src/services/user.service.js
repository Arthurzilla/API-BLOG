const User = require('../models/User');

//função que salva no banco
const saveService = (body) => User.create(body)
const findAllService = () => User.find()
const findByIdService = (id) => User.findById(id)


module.exports = {saveService, findAllService, findByIdService} 