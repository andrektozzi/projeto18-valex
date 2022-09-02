import { Router } from "express";
import { middleware } from "../middlewares/schemasValidationMiddleware.js";
import { authValidationMiddleware } from "../middlewares/authValidationMiddleware.js";
import * as cardController from "../controllers/cardController.js";
import * as cardSchemas from "../schemas/cardSchemas.js";

const cardRouter = Router();

cardRouter.post("/newcards/:employeid", authValidationMiddleware,  middleware(cardSchemas.addCardSchema), cardController.newCard);
cardRouter.put("/activatecards/:cardid", middleware(cardSchemas.activateCardSchema), cardController.activateCard);
cardRouter.get("/viewtransactions/:cardid", cardController.viewTransactions);

export default cardRouter;