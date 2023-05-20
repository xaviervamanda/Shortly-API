import { signUpDB } from "../repositories/users.repositories";

export async function signUp (req, res){
    await signUpDB(req.body);
    return res.sendStatus(201);

}

export async function signIn (req, res){
    

}