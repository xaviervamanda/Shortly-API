import { checkUserByEmail } from "../repositories/users.repositories.js";

export async function createUserValidation (req, res, next){
    const {email} = req.body;

    try{
        const user = await checkUserByEmail(email);
        if (user.rowCount !== 0) return res.status(409).send("User already exists");
        next();
    } catch (err){
        return res.status(500).send(err.message);
    }
}