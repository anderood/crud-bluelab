import { Router } from "express";
import { v4 } from "uuid";
import { isCPF, isPhone } from "brazilian-values";

const usersRoutes = Router();
const usersRoutesx = Router();

const accounts = [];

usersRoutes.post("/", (request, response) => {

    const { first_name, last_name, phone, cpf } = request.body;

    const checkUser = accounts.some( user => user.cpf === cpf);

    if(checkUser){
        return response.status(400).send({ "success": false, "msg": "CPF Já Cadastrado!"})
    }

    if(!isCPF(cpf)){
        return response.status(400).send({ "success": false, "msg": "CPF invalido"})
    }

    if(!isPhone(phone)){
        return response.status(400).send({ "success": false, "msg": "Telefone invalido"})
    }

    const newUser = {
        id: v4(),
        first_name,
        last_name,
        phone,
        cpf,
        created_at: new Date(),
        updated_at: new Date()
    }

    accounts.push(newUser);

    return response.status(201).send({ "success": true, "msg": "Cadastro Realizado com Sucesso!"})


});

usersRoutes.get("/", (request, response ) => {

    const { cpf } = request.body;

    const user = accounts.filter(user => user.cpf === cpf);

    if(!!user.length){
        return response.status(200).send({ "success": true, dataUser: user})
    }

    return response.status(400).send({ "success": false, "msg": "Informações de CPF não armazenadas"})
})


export { usersRoutes };