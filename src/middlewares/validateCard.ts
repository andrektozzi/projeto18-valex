import { NextFunction, Request, Response } from "express";

import createCardSchema from "../schemas/cardSchema";

export function validateCard(req: Request, res: Response, next: NextFunction) {
    const card = req.body;
    const { error } = createCardSchema.validate(card, { abortEarly: false });

    if(error) {
        return res.status(422).send(error.message);
    }

    next();
}