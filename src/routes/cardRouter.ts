import { Router } from 'express';

import * as cardController from "../controllers/cardController";
import * as validateCard from "../middlewares/validateCard";

const cardRouter = Router();

cardRouter.post("/cards", validateCard.validateCard, cardController.create);
cardRouter.post("/cards/:id/activate", validateCard.validateActivation, cardController.activation);

export default cardRouter;