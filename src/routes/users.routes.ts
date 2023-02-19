import { Router } from "express";
import { v4 } from "uuid";
import { isCPF, isPhone } from "brazilian-values";

const usersRoutes = Router();

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

    return response.status(201).send({ "success": true, "msg": "Cadastro Realizado com Sucesso!"})


});


export { usersRoutes };