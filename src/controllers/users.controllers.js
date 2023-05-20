import { signUpDB } from "../repositories/users.repositories.js";
import bcrypt from "bcrypt";

export async function signUp (req, res){
    const {name, email, password} = req.body;

    const hash = bcrypt.hashSync(password, 10);

    await signUpDB({name, email, password: hash});
    return res.sendStatus(201);

}

export async function signIn (req, res){
    

}