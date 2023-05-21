import {db} from "../database/database.connection.js";
import { nanoid } from "nanoid";
export function shortenUrlDB (body, userId, shortUrl){
    const {url} = body;
    
    return db.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`, [url, shortUrl, userId]);
}

export function getUrlById (shortUrl){
    return db.query(`SELECT id, url, "shortUrl" FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
}