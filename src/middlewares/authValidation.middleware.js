import dotenv from "dotenv";
import { checkUserByEmail, checkUserSession } from "../repositories/users.repositories.js";
import jwt from "jsonwebtoken";

dotenv.config();

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401)
    let data;

    const key = process.env.JWT_SECRET || "my_secret_key";

    try {
        data = jwt.verify(token, key);
    } catch (tokenError) {
        return res.status(401).send("Invalid token");
    }

    try {
        const user = await checkUserByEmail(data.email);
        const session = await checkUserSession(token);
        if (session.rowCount === 0 || user.rows[0].id !== session.rows[0].userId) return res.sendStatus(401)
        
        res.locals.userId = user.rows[0].id;
        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}