import { checkUserByEmail, signInDB, signUpDB } from "../repositories/users.repositories.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

const key = nanoid();
dotenv.config();

export async function signUp (req, res){
    const {name, email, password} = req.body;

    const hash = bcrypt.hashSync(password, 10);
    try{
        await signUpDB({name, email, password: hash});
        return res.sendStatus(201);
    } catch (err){
        return res.status(500).send(err.message);
    }
    

}

export async function signIn (req, res){
    const {email, password} = req.body;
    
    const user = await checkUserByEmail(email);
    if (user.rowCount === 0) return res.status(401).send("Email or password is not correct");

    const passwordCorrect = bcrypt.compareSync(password, user.rows[0].password);
    if (!passwordCorrect) return res.status(401).send("Email or password is not correct");

    const data = {email};
    const secretKey = process.env.JWT_SECRET || nanoid(100);
    const token = jwt.sign(data, secretKey);

    try{
        await signInDB(user.rows[0].id, token);

        return res.status(200).send({token});
    } catch (err){
        return res.status(500).send(err.message);
    }
    
}
