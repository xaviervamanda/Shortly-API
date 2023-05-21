import { getUrlById, shortenUrlDB } from "../repositories/urls.repositories.js";
import { nanoid } from "nanoid";

export async function shortenUrl (req, res){
    const {userId} = res.locals;
    const shortUrl = nanoid(8);
    try{
        await shortenUrlDB(req.body, userId, shortUrl);
        const urlInfo = await getUrlById(shortUrl);
        const response = {
            id: urlInfo.rows[0].id,
            shortUrl: urlInfo.rows[0].shortUrl
        };
        return res.status(201).send(response);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}