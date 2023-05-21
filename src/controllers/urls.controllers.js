import { getUrlByIdDB, getUserShortenUrls, shortenUrlDB } from "../repositories/urls.repositories.js";
import { nanoid } from "nanoid";

export async function shortenUrl (req, res){
    const {userId} = res.locals;
    const shortUrl = nanoid(8);
    try{
        await shortenUrlDB(req.body, userId, shortUrl);
        const urlInfo = await getUserShortenUrls(shortUrl);
        return res.status(201).send(urlInfo.rows[0]);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getUrlById (req, res){
    const {id} = req.params;
    try{
        const urlInfos = await getUrlByIdDB(id);
        if (urlInfos.rowCount === 0) return res.sendStatus(404);
        return res.status(200).send(urlInfos.rows[0]);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}