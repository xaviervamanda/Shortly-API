import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controllers.js";
import { createUserValidation } from "../middlewares/users.middlewares.js";
import { validateSchema} from "../middlewares/validationSchema.js"
import { signInSchema, signUpSchema } from "../schemas/users.schemas.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), createUserValidation, signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);

export default usersRouter;