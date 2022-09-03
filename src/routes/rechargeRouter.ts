import { Router } from 'express';
import { middleware } from '../middlewares/schemasValidationMiddleware.js';
import { authValidationMiddleware } from '../middlewares/authValidationMiddleware.js';
import { newRecharge } from '../controllers/rechargeController.js'
import { addRechargeSchema } from "../schemas/rechargeSchemas.js";

const rechargeRouter = Router();

rechargeRouter.post("/rechargecards/:cardid", authValidationMiddleware, middleware(addRechargeSchema), newRecharge);

export default rechargeRouter;