import {db} from "../database/database.connection.js";
export function shortenUrlDB (body, userId, shortUrl){
    const {url} = body;
    
    return db.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`, [url, shortUrl, userId]);
}

export function getUserShortenUrl(shortUrl){
    return db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
}
export function getUrlByIdDB (id){
    return db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
}

export function deleteUrlDB (id){
    return db.query(`DELETE FROM urls WHERE id = $1`, [id]);
}

export function getUserShortenUrlsDB(userId){
    return db.query(`SELECT users.id, users.name,
    (SELECT SUM("visitCount") FROM urls WHERE "userId" = $1) AS "visitCount", 
    (
        SELECT JSON_AGG
        (
            JSON_BUILD_OBJECT('id', u.id, 'shortUrl', u."shortUrl", 'url', u.url, 'visitCount', u."visitCount")
        )
        FROM urls u
        WHERE u."userId" = $1
    ) AS "shortenedUrls"
    FROM urls 
    JOIN users ON users.id = urls."userId"
    WHERE "userId" = $1;`, [userId]);
}

export function rankingUrlsByVisitsDB (){
    return db.query(`SELECT users.id, users.name,
    COUNT(urls.id) AS "linksCount",
    SUM(urls."visitCount") AS "visitCount"
    FROM users
    LEFT JOIN urls ON users.id = urls."userId"
    GROUP BY users.id, users.name
    ORDER BY "visitCount" DESC
    LIMIT 10;
    `);
}

export function updateUrlVisitCount (shortUrl){
    return db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1`, [shortUrl]);
}