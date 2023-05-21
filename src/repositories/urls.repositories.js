import {db} from "../database/database.connection.js";
export function shortenUrlDB (body, userId, shortUrl){
    const {url} = body;
    
    return db.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`, [url, shortUrl, userId]);
}

export function getUserShortenUrls(shortUrl){
    return db.query(`SELECT id, "shortUrl" FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
}
export function getUrlByIdDB (id){
    return db.query(`SELECT id, url, "shortUrl" FROM urls WHERE id = $1`, [id]);
}