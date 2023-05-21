import { getUrlByIdDB } from "../repositories/urls.repositories";

export async function checkExistingUrl (req, res, next){
    const {id} = req.params;
    try{
        const urlInfos = await getUrlByIdDB(id);
        if (urlInfos.rowCount === 0) return res.sendStatus(404);
        res.locals.urlInfos = urlInfos;
        next ();
    } catch (err) {
        return res.status(500).send(err.message);
    }   
}

export async function checkUrlOwner (req, res, next){
    const {id} = req.params;
    const {userId} = res.locals;

    try{
        const urlInfos = await getUrlByIdDB(id);
        if (urlInfos.rows[0].userId !== userId) return res.status(401).send("This user is not the url owner");
        next()
    } catch (err) {
        return res.status(500).send(err.message);
    }
}