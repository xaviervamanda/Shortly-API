import { Router } from "express";
import { urlSchema } from "../schemas/urls.schemas.js";
import { validateSchema } from "../middlewares/validationSchema.js";

const urlsRouter = Router();

urlsRouter.post ("/urls/shorten", validateSchema(urlSchema), shortenUrl);
urlsRouter.get ("/urls/:id", getUrlById);
urlsRouter.get ("/urls/open/:shortUrl", openShortenUrl);
urlsRouter.delete ("/urls/:id", deleteUrl);
urlsRouter.get ("/users/me", getUserShortenUrls);
urlsRouter.get ("/ranking", rankingUrlsByVisits);


export default urlsRouter;