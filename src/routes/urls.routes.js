import { Router } from "express";
import { urlSchema } from "../schemas/urls.schemas.js";
import { validateSchema } from "../middlewares/validationSchema.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { deleteUrl, getUrlById, getUserShortenUrls, rankingUrlsByVisits, shortenUrl } from "../controllers/urls.controllers.js";


const urlsRouter = Router();

urlsRouter.get ("/urls/:id", getUrlById);
// urlsRouter.get ("/urls/open/:shortUrl", openShortenUrl);
urlsRouter.get ("/ranking", rankingUrlsByVisits);

urlsRouter.use(authValidation);

urlsRouter.post ("/urls/shorten", validateSchema(urlSchema), shortenUrl);
urlsRouter.delete ("/urls/:id", deleteUrl);
urlsRouter.get ("/users/me", getUserShortenUrls);


export default urlsRouter;