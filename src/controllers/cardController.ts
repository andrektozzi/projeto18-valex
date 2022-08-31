import { Request, Response} from 'express';

import * as cardService from '../services/cardService';

export async function create(req: Request, res: Response) {
    const apiKey = req.headers["x-api-key"] as string;
    if (!apiKey) return res.sendStatus(401);

    const { employeeId, type } = req.body;
    const card = await cardService.create(apiKey, employeeId, type);

    return res.status(201).send(card);
}

export async function activation(req: Request, res: Response) {
    const { id } = req.params;
    const { cvc, password } = req.body;

    await cardService.activation(Number(id), cvc, password);

    return res.sendStatus(200);
}