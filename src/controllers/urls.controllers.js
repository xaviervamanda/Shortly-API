import { deleteUrlDB, getUrlByIdDB, getUserShortenUrl, getUserShortenUrlsDB, rankingUrlsByVisitsDB, shortenUrlDB } from "../repositories/urls.repositories.js";
import { nanoid } from "nanoid";

export async function shortenUrl (req, res){
    const {userId} = res.locals;
    const shortUrl = nanoid(8);
    try{
        await shortenUrlDB(req.body, userId, shortUrl);
        const urlInfo = await getUserShortenUrl(shortUrl);
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
        const response = {
            id: urlInfos.rows[0].id,
            url: urlInfos.rows[0].url,
            shortUrl: urlInfos.rows[0].shortUrl
        }
        return res.status(200).send(response);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function deleteUrl (req, res){
    const {id} = req.params;
    const {userId} = res.locals;

    try{
        const urlInfos = await getUrlByIdDB(id);
        if (urlInfos.rows[0].userId !== userId) return res.status(401).send("This user is not the url owner");
        await deleteUrlDB(id);
        return res.sendStatus(204);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getUserShortenUrls (req, res){
    const {userId} = res.locals;
    try{
        const urls = await getUserShortenUrlsDB(userId);
        return res.status(200).send(urls.rows[0]);
    }catch (err) {
        return res.status(500).send(err.message);
    }
    
}

export async function rankingUrlsByVisits (req, res){
    const ranking = await rankingUrlsByVisitsDB();
    return res.status(200).send(ranking.rows);
}