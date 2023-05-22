import dotenv from "dotenv";
import { checkUserByEmail, checkUserSession } from "../repositories/users.repositories.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

dotenv.config();

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401)

    const key = process.env.JWT_SECRET || "my_secret_key";

    try {
        const data = jwt.verify(token, key);
        const user = await checkUserByEmail(data.email);
        const session = await checkUserSession(token);
        if (session.rowCount === 0 || user.rows[0].id !== session.rows[0].userId) return res.sendStatus(401)
        
        res.locals.userId = user.rows[0].id;
        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}