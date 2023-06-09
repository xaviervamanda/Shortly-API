import { deleteUrlDB, getUserShortenUrl, getUserShortenUrlsDB, rankingUrlsByVisitsDB, shortenUrlDB, updateUrlVisitCount } from "../repositories/urls.repositories.js";
import { nanoid } from "nanoid";

export async function shortenUrl (req, res){
    const {userId} = res.locals;
    const shortUrl = nanoid(8);
    try{
        await shortenUrlDB(req.body, userId, shortUrl);
        const urlInfo = await getUserShortenUrl(shortUrl);
        const response = {
            id: urlInfo.rows[0].id,
            shortUrl: urlInfo.rows[0].shortUrl
        }
        return res.status(201).send(response);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export function getUrlById (req, res){
    const {urlInfos} = res.locals;

        const response = {
            id: urlInfos.rows[0].id,
            url: urlInfos.rows[0].url,
            shortUrl: urlInfos.rows[0].shortUrl
        };
        return res.status(200).send(response);
}

export async function deleteUrl (req, res){
    const {id} = req.params;

    try{
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

export async function openShortenUrl (req, res){
    const {shortUrlInfos} = res.locals;
    try{
        await updateUrlVisitCount(shortUrlInfos.rows[0].shortUrl);
        return res.redirect(shortUrlInfos.rows[0].url);
    } catch (err){
        return res.status(500).send(err.message);
    }
}