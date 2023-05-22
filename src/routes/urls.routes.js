import { Router } from "express";
import { urlSchema } from "../schemas/urls.schemas.js";
import { validateSchema } from "../middlewares/validationSchema.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { deleteUrl, getUrlById, openShortenUrl, rankingUrlsByVisits, shortenUrl } from "../controllers/urls.controllers.js";
import { checkExistingUrl, checkExistingUrlById, checkUrlOwner } from "../middlewares/urls.middlewares.js";

const urlsRouter = Router();

urlsRouter.get ("/urls/:id", checkExistingUrlById, getUrlById);
urlsRouter.get ("/urls/open/:shortUrl", checkExistingUrl, openShortenUrl);
urlsRouter.get ("/ranking", rankingUrlsByVisits);

urlsRouter.use(authValidation);

urlsRouter.post ("/urls/shorten", validateSchema(urlSchema), shortenUrl);
urlsRouter.delete ("/urls/:id", checkExistingUrlById, checkUrlOwner, deleteUrl);


export default urlsRouter;