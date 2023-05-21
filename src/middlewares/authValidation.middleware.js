import {db} from "../database/database.connection.js";
import dotenv from "dotenv";

dotenv.config();

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401)
    
    const key = process.env.JWT_SECRET;

    try {

        const session = await db.collection("sessions").findOne({ token })
        if (!session) return res.sendStatus(401)

        res.locals.session = session

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}