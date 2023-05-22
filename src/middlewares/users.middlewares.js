import { checkUserByEmail, checkUserById } from "../repositories/users.repositories.js";

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

export async function checkExistingUserId (req, res, next){
    const {userId} = res.locals;

    try{
        const user = await checkUserById(userId);
        if (user.rowCount === 0) return res.status(404).send("User with this id does not exist!");
        next();
    } catch (err){
        return res.status(500).send(err.message);
    }
}