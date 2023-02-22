import { Router } from "express";
import { v4 } from "uuid";
import { isCPF, isPhone } from "brazilian-values";

const usersRoutes = Router();

const accounts = [];

usersRoutes.post("/register", (request, response) => {

    const { first_name, last_name, phone, cpf } = request.body;

    const checkUser = accounts.some( user => user.cpf === cpf);

    if(checkUser){
        return response.status(400).json({ "success": false, "msg": "CPF Já Cadastrado!"})
    }

    if(!isCPF(cpf)){
        return response.status(400).json({ "success": false, "msg": "CPF invalido"})
    }

    if(!isPhone(phone)){
        return response.status(400).json({ "success": false, "msg": "Telefone invalido"})
    }

    accounts.push({
        id: v4(),
        first_name,
        last_name,
        phone,
        cpf,
        created_at: new Date(),
        updated_at: new Date()
    });

    return response.status(201).json({ "success": true, "msg": "Cadastro Realizado com Sucesso!"})
});

usersRoutes.get("/search", (request, response ) => {

    const { cpf } = request.query;
    
    const user = accounts.filter(user => user.cpf === cpf);

    if(!!user.length){
        return response.status(200).json({ "success": true, dataUser: user})
    }

    return response.status(400).json({ "success": false, "msg": "Informações de CPF não armazenadas"})
});

usersRoutes.put("/user/:id", (request, response) => {

    const { id } = request.params;
    const { first_name, last_name, phone } = request.body;

    const userUpdate = accounts.find(item => item.id === id);
    
    if(!userUpdate){
        return response.status(400).json({success: false, msg: "Usuario não encontrado"})
    }

    userUpdate.first_name = first_name
    userUpdate.last_name = last_name
    userUpdate.phone = phone
     

    return response.status(201).json({ "success": true, "msg": "Cadastro Atualizado", data: userUpdate})
});

usersRoutes.delete("/user/:id", (request, response) => {


    const { id } = request.params;

    const findIndex = accounts.findIndex(item => item.id === id);

    if(findIndex === -1){
        return response.status(400).json({"success": false, "msg": "Usuario não encontrado"})
    }

    accounts.splice(findIndex);

    return response.status(204).json();

})

usersRoutes.get("/users", (request, response) => {
    return response.status(200).json(accounts);
})


export { usersRoutes };