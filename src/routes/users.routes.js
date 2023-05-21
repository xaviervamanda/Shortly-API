import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controllers.js";
import { createUserValidation } from "../middlewares/users.middlewares.js";
import { validateSchema} from "../middlewares/validationSchema.js"
import { signInSchema, signUpSchema } from "../schemas/users.schemas.js";
import { getUserShortenUrls } from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), createUserValidation, signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);
usersRouter.get ("/users/me", authValidation, getUserShortenUrls);

export default usersRouter;